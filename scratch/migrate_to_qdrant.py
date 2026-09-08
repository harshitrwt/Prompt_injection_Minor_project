import os
import sys

# Ensure root workspace directory is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Force PyTorch backend for transformers
os.environ["USE_TF"] = "0"
os.environ["USE_TORCH"] = "1"
os.environ["TRANSFORMERS_NO_ADVISORY_WARNINGS"] = "1"

import pandas as pd
from sentence_transformers import SentenceTransformer  # type: ignore
from src.detectors.qdrant_client_mgr import QdrantManager

def run_migration(csv_path: str = "data/processed/train.csv", batch_size: int = 100):
    print("=" * 65)
    print("      MIGRATING ATTACK SIGNATURES TO QDRANT CLUSTER         ")
    print("=" * 65)

    if not os.path.exists(csv_path):
        print(f"[Error] Dataset file '{csv_path}' not found.")
        sys.exit(1)

    # 1. Connect to Qdrant
    qdrant = QdrantManager()
    if not qdrant.is_connected:
        print("[Error] Could not connect to Qdrant Cloud cluster. Please check .env credentials.")
        sys.exit(1)

    print(f"[Qdrant Cloud] Successfully authenticated to: {qdrant.url}")
    print(f"[Qdrant Cloud] Target collection: '{qdrant.collection_name}'")

    # 2. Load attack training samples
    df = pd.read_csv(csv_path)
    attack_rows = df[df['label'] == 1].dropna(subset=['clean_text']).copy()
    print(f"[Data] Found {len(attack_rows)} malicious attack reference samples in '{csv_path}'.")

    texts = attack_rows['clean_text'].tolist()
    metadatas = []
    for _, row in attack_rows.iterrows():
        metadatas.append({
            "attack_type": str(row.get('attack_type', 'unknown')),
            "transformation": str(row.get('transformation', 'none')),
            "difficulty": str(row.get('difficulty', 'standard')),
            "source": str(row.get('source', 'kaggle_or_huggingface')),
            "preview": str(row['clean_text'])[:120]
        })

    # 3. Generate dense embeddings
    print(f"[Embedding] Encoding {len(texts)} attack samples using all-MiniLM-L6-v2 (dim=384)...")
    encoder = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = encoder.encode(texts, convert_to_tensor=False, show_progress_bar=True)
    vectors = [emb.tolist() for emb in embeddings]

    # 4. Upsert to Qdrant
    print(f"[Qdrant Cloud] Upserting vectors in batches of {batch_size}...")
    qdrant.ensure_collection(recreate=True)
    total_indexed = qdrant.batch_upsert_vectors(vectors, texts, metadatas, batch_size=batch_size)

    # 5. Verify final collection stats
    final_count = qdrant.get_count()
    print("-" * 65)
    print(f"[Success] Migration Complete!")
    print(f"[Qdrant Cloud] Verified vectors in '{qdrant.collection_name}': {final_count}")
    print("=" * 65)

if __name__ == "__main__":
    run_migration()
