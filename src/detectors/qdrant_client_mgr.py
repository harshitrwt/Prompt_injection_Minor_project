import os
import uuid
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    from qdrant_client import QdrantClient
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
        
        if QDRANT_AVAILABLE and self.url and self.api_key:
            self._connect()

    def _connect(self) -> bool:
        """Initialize connection to Qdrant Cloud cluster."""
        try:
            self.client = QdrantClient(
                url=self.url,
                api_key=self.api_key,
                timeout=10.0,
                check_compatibility=False
            )
            # Test connectivity
            self.client.get_collections()
            self.is_connected = True
            return True
        except Exception as e:
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
        if not self.is_connected or not self.client:
            if not self._connect():
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
            return results
        except Exception as e:
            print(f"[QdrantManager] Search query error: {e}")
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
