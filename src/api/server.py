import os
import sys
import time
import uuid
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

# Ensure root workspace directory is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from fastapi import FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from src.pipeline.security_pipeline import SecurityPipeline

app = FastAPI(
    title="Cordon Prompt Injection Defense Gateway",
    version="1.0.0",
    description="Sub-20ms Multi-Signal AI Security Gateway powered by Machine Learning and Qdrant Cloud Vector Search."
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

class ThreatUpsertRequest(BaseModel):
    prompt: str
    category: str = "zero_day"
    severity: str = "high"

def verify_api_key(authorization: Optional[str] = Header(None), x_api_key: Optional[str] = Header(None)) -> str:
    """Validates presence and format of API key."""
    key = x_api_key
    if not key and authorization:
        parts = authorization.split(" ")
        if len(parts) == 2 and parts[0].lower() == "bearer":
            key = parts[1]
        else:
            key = authorization
    
    if not key or not (key.startswith("st_live_") or key.startswith("pg_live_") or key.startswith("test_")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key. Pass 'x-api-key' or 'Authorization: Bearer st_live_...'"
        )
    return key

@app.get("/v1/health")
def health():
    return {
        "status": "healthy",
        "pipeline_initialized": pipeline.is_initialized,
        "qdrant_connected": pipeline.semantic.using_qdrant,
        "qdrant_points": pipeline.semantic.qdrant.get_count() if pipeline.semantic.qdrant else 0
    }

@app.post("/v1/inspect", response_model=InspectResponse)
def inspect_prompt(
    payload: InspectRequest,
    api_key: str = Header(..., alias="x-api-key", description="Your Cordon API key")
):
    start_time = time.perf_counter()
    
    # Run multi-signal inspection
    res = pipeline.analyze_prompt(payload.prompt)
    elapsed_ms = (time.perf_counter() - start_time) * 1000.0
    
    fusion = res["fusion_output"]
    risk_score = fusion["risk_score"]
    decision = fusion["decision"]
    risk_level = fusion["risk_level"]

    # Optional sensitivity tuning
    if payload.sensitivity == "strict":
        if risk_score >= 0.35:
            decision = "BLOCK"
            risk_level = "HIGH"
    elif payload.sensitivity == "lenient":
        if risk_score < 0.70:
            decision = "SAFE"
            risk_level = "LOW"

    return InspectResponse(
        id=f"insp_{uuid.uuid4().hex[:12]}",
        decision=decision,
        risk_score=risk_score,
        risk_level=risk_level,
        latency_ms=round(elapsed_ms, 2),
        input_prompt=payload.prompt,
        cleaned_prompt=res.get("cleaned_prompt"),
        detectors=res.get("detectors", {})
    )

@app.post("/v1/threats/upsert")
def upsert_threat(
    threat: ThreatUpsertRequest,
    api_key: str = Header(..., alias="x-api-key")
):
    """Upsert real-time zero-day threat directly into Qdrant Cloud."""
    success = pipeline.semantic.add_live_threat(
        prompt=threat.prompt,
        category=threat.category,
        severity=threat.severity
    )
    if not success:
        raise HTTPException(status_code=500, detail="Failed to upsert threat to Qdrant Cloud")
    return {"success": True, "message": "Threat signature registered to Qdrant Cloud"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.api.server:app", host="0.0.0.0", port=8000, reload=True)
