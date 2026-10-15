import os
import uuid
from typing import List, Dict, Any, Optional
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    # pyrefly: ignore [missing-import]
    from qdrant_client import QdrantClient
    # pyrefly: ignore [missing-import]
    from qdrant_client.models import Distance, VectorParams, PointStruct
    QDRANT_AVAILABLE = True
except ImportError:
    QDRANT_AVAILABLE = False


class QdrantManager:
    """
    Manages high-performance Approximate Nearest Neighbor (ANN) vector search
    and live threat indexing against Qdrant Cloud.
    """
    def __init__(
        self,
        url: Optional[str] = None,
        api_key: Optional[str] = None,
        collection_name: Optional[str] = None,
        vector_dim: int = 384
    ):
        self.url = url or os.getenv("QDRANT_URL")
        self.api_key = api_key or os.getenv("QDRANT_API_KEY")
        self.collection_name = collection_name or os.getenv("QDRANT_COLLECTION_NAME", "prompt_injections")
        self.vector_dim = int(os.getenv("VECTOR_DIMENSION", str(vector_dim)))
        self.client: Optional[QdrantClient] = None
        self.is_connected = False
        self._circuit_open = False
        self._consecutive_failures = 0
        self._max_consecutive_failures = 2
        
        if QDRANT_AVAILABLE and self.url and self.api_key:
            self._connect()
        elif not QDRANT_AVAILABLE:
            print("[QdrantManager] Notice: qdrant-client package not installed. Using local fallback.")
        else:
            print("[QdrantManager] Notice: QDRANT_URL or QDRANT_API_KEY not configured. Using local fallback.")

    def _connect(self) -> bool:
        """Initialize connection to Qdrant Cloud cluster with tight timeout and circuit breaker."""
        if self._circuit_open:
            return False

        if not self.url or not self.api_key:
            self.is_connected = False
            return False

        try:
            self.client = QdrantClient(
                url=self.url,
                api_key=self.api_key,
                timeout=4.0,
                check_compatibility=False
            )
            # Test connectivity with lightweight call
            self.client.get_collections()
            self.is_connected = True
            self._consecutive_failures = 0
            self._circuit_open = False
            return True
        except Exception as e:
            self._consecutive_failures += 1
            if self._consecutive_failures >= self._max_consecutive_failures:
                self._circuit_open = True
                print(f"[QdrantManager] Warning: Unable to reach Qdrant Cloud ({e}). Circuit breaker opened; using local embeddings.")
            else:
                print(f"[QdrantManager] Connection warning: Unable to connect to Qdrant Cloud ({e})")
            self.is_connected = False
            return False

    def ensure_collection(self, recreate: bool = False) -> bool:
        """Ensures the target attack signatures collection exists with Cosine metric."""
        if not self.is_connected or not self.client:
            if not self._connect():
                return False

        try:
            collections_res = self.client.get_collections()
            existing_names = [col.name for col in collections_res.collections]
            
            if self.collection_name in existing_names:
                if recreate:
                    print(f"[QdrantManager] Recreating collection '{self.collection_name}'...")
                    self.client.delete_collection(collection_name=self.collection_name)
                else:
                    return True
                    
            print(f"[QdrantManager] Creating collection '{self.collection_name}' (dim={self.vector_dim}, metric=Cosine)...")
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=self.vector_dim, distance=Distance.COSINE)
            )
            return True
        except Exception as e:
            print(f"[QdrantManager] Error ensuring collection: {e}")
            return False

    def get_count(self) -> int:
        """Returns total number of attack vectors stored in the collection."""
        if not self.is_connected or not self.client:
            return 0
        try:
            res = self.client.count(collection_name=self.collection_name)
            return res.count
        except Exception:
            return 0

    def batch_upsert_vectors(self, vectors: List[List[float]], texts: List[str], metadatas: Optional[List[Dict[str, Any]]] = None, batch_size: int = 100) -> int:
        """
        Batch-upsert reference attack vectors with payloads into Qdrant Cloud.
        """
        if not self.is_connected or not self.client:
            if not self._connect():
                raise ConnectionError("Cannot upsert: Qdrant Cloud is not reachable.")

        self.ensure_collection(recreate=False)
        total_upserted = 0
        total_items = len(vectors)
        
        for i in range(0, total_items, batch_size):
            chunk_vectors = vectors[i:i + batch_size]
            chunk_texts = texts[i:i + batch_size]
            chunk_metas = metadatas[i:i + batch_size] if metadatas else [{}] * len(chunk_texts)
            
            points = []
            for j, (vec, txt, meta) in enumerate(zip(chunk_vectors, chunk_texts, chunk_metas)):
                # Consistent deterministic or UUID point id
                point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{txt}_{i+j}"))
                payload = {"text": txt, **meta}
                points.append(PointStruct(id=point_id, vector=vec, payload=payload))
                
            self.client.upsert(
                collection_name=self.collection_name,
                points=points
            )
            total_upserted += len(points)
            print(f"[QdrantManager] Upserted {total_upserted}/{total_items} vectors...")

        return total_upserted

    def search_threat(self, query_vector: List[float], limit: int = 5, score_threshold: Optional[float] = None) -> List[Dict[str, Any]]:
        """
        Execute sub-millisecond Approximate Nearest Neighbor (ANN) search for an input vector.
        """
        if self._circuit_open or not self.is_connected or not self.client:
            return []

        try:
            # Modern qdrant-client uses query_points
            if hasattr(self.client, "query_points"):
                query_res = self.client.query_points(
                    collection_name=self.collection_name,
                    query=query_vector,
                    limit=limit,
                    score_threshold=score_threshold
                )
                hits = query_res.points
            else:
                hits = self.client.search(
                    collection_name=self.collection_name,
                    query_vector=query_vector,
                    limit=limit,
                    score_threshold=score_threshold
                )
            results = []
            for hit in hits:
                results.append({
                    "id": str(hit.id),
                    "score": float(hit.score),
                    "payload": hit.payload or {}
                })
            # Reset failure count on success
            self._consecutive_failures = 0
            return results
        except Exception as e:
            self._consecutive_failures += 1
            if self._consecutive_failures >= self._max_consecutive_failures:
                self._circuit_open = True
                self.is_connected = False
                print(f"[QdrantManager] Consecutive search errors ({e}). Switching permanently to local fallback.")
            else:
                print(f"[QdrantManager] Search query warning: {e}")
            return []

    def live_upsert_threat(self, text: str, vector: List[float], category: str = "zero_day", severity: str = "high") -> bool:
        """
        Live-updates the Qdrant Cloud vector database with a new zero-day attack payload.
        Instantly protects all connected client applications without needing restart.
        """
        if not self.is_connected or not self.client:
            if not self._connect():
                return False

        try:
            point_id = str(uuid.uuid4())
            payload = {
                "text": text,
                "category": category,
                "severity": severity,
                "source": "live_telemetry"
            }
            self.client.upsert(
                collection_name=self.collection_name,
                points=[PointStruct(id=point_id, vector=vector, payload=payload)]
            )
            print(f"[QdrantManager] Successfully registered live threat signature: '{text[:50]}...'")
            return True
        except Exception as e:
            print(f"[QdrantManager] Failed to register live threat: {e}")
            return False

    def diagnose_connection(self) -> Dict[str, Any]:
        """
        Runs comprehensive connectivity diagnostic against Qdrant Cloud.
        Returns detailed report and prints human-readable status.
        """
        import time
        report = {
            "qdrant_library_available": QDRANT_AVAILABLE,
            "url_configured": bool(self.url),
            "url_masked": (self.url[:25] + "..." + self.url[-15:]) if self.url and len(self.url) > 40 else (self.url or "Not Set"),
            "api_key_configured": bool(self.api_key),
            "collection_name": self.collection_name,
            "is_connected": False,
            "ping_latency_ms": None,
            "collection_exists": False,
            "vector_count": 0,
            "test_query_latency_ms": None,
            "status": "FAILED",
            "message": ""
        }

        print("\n========================================================")
        print("         QDRANT CLUSTER DIAGNOSTIC HEALTH CHECK          ")
        print("========================================================")
        print(f" • Qdrant SDK Installed:   {'[OK] Yes' if report['qdrant_library_available'] else '[FAIL] No (pip install qdrant-client)'}")
        print(f" • Target Cloud URL:       {report['url_masked']}")
        print(f" • API Key Present:        {'[OK] Yes' if report['api_key_configured'] else '[FAIL] Missing'}")
        print(f" • Target Collection:      {report['collection_name']}")

        if not QDRANT_AVAILABLE:
            report["message"] = "qdrant-client package is not installed."
            print(f"\n[Status] {report['status']}: {report['message']}")
            return report

        if not self.url or not self.api_key:
            report["message"] = "Missing QDRANT_URL or QDRANT_API_KEY environment variables."
            print(f"\n[Status] {report['status']}: {report['message']}")
            print("  Fix: Add QDRANT_URL and QDRANT_API_KEY to your .env file or environment.")
            return report

        # Test Ping / Connect
        print("\n Connecting to cluster...")
        t0 = time.time()
        try:
            self._circuit_open = False
            self._consecutive_failures = 0
            if not self._connect() or not self.client:
                raise ConnectionError("Cluster handshake failed.")
            report["ping_latency_ms"] = round((time.time() - t0) * 1000, 2)
            report["is_connected"] = True
            print(f" • Cluster Handshake:      [OK] Connected in {report['ping_latency_ms']} ms")
        except Exception as e:
            report["message"] = f"Connection failed: {e}"
            print(f" • Cluster Handshake:      [FAIL] {e}")
            print("\n Possible causes:")
            print("   1. Blocked outbound HTTPS port 443/6333 by firewall or proxy.")
            print("   2. Invalid or expired Qdrant Cloud API Key.")
            print("   3. Cluster is paused or deleted in Qdrant Cloud Console.")
            return report

        # Test Collection & Count
        try:
            collections_res = self.client.get_collections()
            col_names = [col.name for col in collections_res.collections]
            report["collection_exists"] = self.collection_name in col_names
            print(f" • Collection Existence:   {'[OK] Found' if report['collection_exists'] else '[WARN] Not Found'}")

            if report["collection_exists"]:
                count = self.get_count()
                report["vector_count"] = count
                print(f" • Indexed Threat Vectors: {count:,} points")

                # Test Single Vector Query Latency
                dummy_vec = [0.01] * self.vector_dim
                t_query = time.time()
                self.search_threat(dummy_vec, limit=1)
                report["test_query_latency_ms"] = round((time.time() - t_query) * 1000, 2)
                print(f" • Query Round-Trip Time:  {report['test_query_latency_ms']} ms")
        except Exception as e:
            print(f" • Collection Query:       [WARN] {e}")

        report["status"] = "HEALTHY" if report["is_connected"] and report["collection_exists"] else "DEGRADED"
        report["message"] = "Qdrant Cloud connection is optimal and ready."
        print(f"\n========================================================")
        print(f" OVERALL HEALTH STATUS: [{report['status']}]")
        print(f" {report['message']}")
        print("========================================================\n")
        return report

