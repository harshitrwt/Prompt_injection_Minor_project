import os
import sys
import time
import uuid
from typing import Optional, List, Dict, Any
# pyrefly: ignore [missing-import]
from pydantic import BaseModel, Field

# Ensure root workspace directory is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

# pyrefly: ignore [missing-import]
from fastapi import FastAPI, Header, HTTPException, status, Response
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from src.pipeline.security_pipeline import SecurityPipeline

app = FastAPI(
    title="Cordon Prompt Injection Defense Gateway",
    version="1.1.0",
    description="Sub-20ms Multi-Signal AI Security Gateway with Free Community and Pro Enterprise tiers powered by ML and Qdrant Cloud Vector Search."
)

# Enable CORS for web applications and client SDKs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Security Pipeline
pipeline = SecurityPipeline()
is_ready = pipeline.load_pipeline()
if not is_ready:
    print("[Gateway Warning] Pre-trained models not loaded. Pipeline will initialize on first request.")

# Request & Response Schemas
class InspectRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=25000, description="The user prompt to inspect")
    tenant_id: Optional[str] = Field(None, description="Optional tenant or application identifier")
    sensitivity: Optional[str] = Field("balanced", description="Sensitivity policy: 'strict', 'balanced', or 'lenient'")

class InspectResponse(BaseModel):
    id: str
    decision: str
    risk_score: float
    risk_level: str
    latency_ms: float
    input_prompt: str
    cleaned_prompt: Optional[str] = None
    detectors: Dict[str, Any]
    tier: str = "free"
    quota_remaining: Optional[int] = None
    quota_limit: Optional[int] = None

class ThreatUpsertRequest(BaseModel):
    prompt: str
    category: str = "zero_day"
    severity: str = "high"

def get_tier_from_key(key: str) -> tuple[str, int, int]:
    """
    Returns (tier_name, quota_limit, quota_remaining)
    - Free Tier: 5,000 requests / month
    - Pro Tier: 100,000 requests / month
    """
    if key.startswith("st_free_") or key.startswith("free_"):
        return ("free", 5000, 4858)
    # Default to pro tier for st_pro_, st_live_, pg_live_, or test_
    return ("pro", 100000, 95790)

def verify_api_key(authorization: Optional[str] = Header(None), x_api_key: Optional[str] = Header(None)) -> str:
    """Validates presence and format of API key across Free and Pro tiers."""
    key = x_api_key
    if not key and authorization:
        parts = authorization.split(" ")
        if len(parts) == 2 and parts[0].lower() == "bearer":
            key = parts[1]
        else:
            key = authorization
    
    valid_prefixes = ("st_free_", "free_", "st_pro_", "st_live_", "pg_live_", "test_")
    if not key or not any(key.startswith(p) for p in valid_prefixes):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key. Pass 'x-api-key' with 'st_free_...' (Free Tier) or 'st_pro_...' (Pro Tier)."
        )
    return key

@app.get("/v1/health")
def health():
    return {
        "status": "healthy",
        "pipeline_initialized": pipeline.is_initialized,
        "qdrant_connected": pipeline.semantic.using_qdrant,
        "qdrant_points": pipeline.semantic.qdrant.get_count() if pipeline.semantic.qdrant else 0,
        "supported_tiers": ["free", "pro"]
    }

@app.post("/v1/inspect", response_model=InspectResponse)
def inspect_prompt(
    payload: InspectRequest,
    response: Response,
    api_key: str = Header(..., alias="x-api-key", description="Your Cordon API key ('st_free_...' or 'st_pro_...')")
):
    key = verify_api_key(x_api_key=api_key)
    tier, quota_limit, quota_remaining = get_tier_from_key(key)
    
    start_time = time.perf_counter()
    
    # Run multi-signal inspection
    res = pipeline.analyze_prompt(payload.prompt)
    elapsed_ms = (time.perf_counter() - start_time) * 1000.0
    
    fusion = res["fusion_output"]
    risk_score = fusion["risk_score"]
    decision = fusion["decision"]
    risk_level = fusion["risk_level"]

    # Optional sensitivity tuning (Pro Tier feature, fallback gracefully on free)
    if payload.sensitivity == "strict":
        if risk_score >= 0.35:
            decision = "BLOCK"
            risk_level = "HIGH"
    elif payload.sensitivity == "lenient":
        if risk_score < 0.70:
            decision = "SAFE"
            risk_level = "LOW"

    # Set response tier and quota headers
    response.headers["x-cordon-tier"] = tier
    response.headers["x-cordon-quota-limit"] = str(quota_limit)
    response.headers["x-cordon-quota-remaining"] = str(quota_remaining)

    return InspectResponse(
        id=f"insp_{uuid.uuid4().hex[:12]}",
        decision=decision,
        risk_score=risk_score,
        risk_level=risk_level,
        latency_ms=round(elapsed_ms, 2),
        input_prompt=payload.prompt,
        cleaned_prompt=res.get("cleaned_prompt"),
        detectors=res.get("detectors", {}),
        tier=tier,
        quota_remaining=quota_remaining,
        quota_limit=quota_limit
    )

@app.post("/v1/threats/upsert")
def upsert_threat(
    threat: ThreatUpsertRequest,
    api_key: str = Header(..., alias="x-api-key")
):
    """Upsert real-time zero-day threat directly into Qdrant Cloud (Pro Tier)."""
    key = verify_api_key(x_api_key=api_key)
    tier, _, _ = get_tier_from_key(key)
    if tier != "pro":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Custom threat signature upsert requires a Pro Tier API key."
        )

    success = pipeline.semantic.add_live_threat(
        prompt=threat.prompt,
        category=threat.category,
        severity=threat.severity
    )
    if not success:
        raise HTTPException(status_code=500, detail="Failed to upsert threat to Qdrant Cloud")
    return {"success": True, "message": "Threat signature registered to Qdrant Cloud", "tier": "pro"}

if __name__ == "__main__":
    # pyrefly: ignore [missing-import]
    import uvicorn
    uvicorn.run("src.api.server:app", host="0.0.0.0", port=8000, reload=True)
