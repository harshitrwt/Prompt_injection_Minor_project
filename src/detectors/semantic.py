import os
import sys

# Disable TF/Keras import in transformers and force PyTorch backend
os.environ["USE_TF"] = "0"
os.environ["USE_TORCH"] = "1"
os.environ["TRANSFORMERS_NO_ADVISORY_WARNINGS"] = "1"

import re
import joblib
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer, util

class SemanticDetector:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2", model_dir: str = "models/embeddings"):
        self.model_name = model_name
        self.model_dir = model_dir
        self.encoder = SentenceTransformer(model_name)
        self.attack_embeddings = None
        self.attack_texts = []
        os.makedirs(self.model_dir, exist_ok=True)

    def fit_and_index(self, train_df: pd.DataFrame):
        """Build vector embeddings index from known attack samples in training set."""
        attack_rows = train_df[train_df['label'] == 1]
        self.attack_texts = attack_rows['clean_text'].tolist()
        
        print(f"[SemanticDetector] Encoding {len(self.attack_texts)} attack reference vectors...")
        self.attack_embeddings = self.encoder.encode(self.attack_texts, convert_to_tensor=True, show_progress_bar=False)
        
        self.save_index()
        print("[SemanticDetector] Vector embeddings index built and saved.")

    def save_index(self):
        index_path = os.path.join(self.model_dir, "attack_embeddings.joblib")
        data = {
            "attack_texts": self.attack_texts,
            "attack_embeddings": self.attack_embeddings.cpu()
        }
        joblib.dump(data, index_path)

    def load_index(self) -> bool:
        index_path = os.path.join(self.model_dir, "attack_embeddings.joblib")
        if os.path.exists(index_path):
            data = joblib.load(index_path)
            self.attack_texts = data["attack_texts"]
            self.attack_embeddings = data["attack_embeddings"]
            return True
        return False

    def _extract_candidate_windows(self, text: str) -> list:
        """
        Extracts candidate evaluation windows.
        Evaluates full text, plus individual clauses if transitional override phrases exist.
        """
        candidates = [text]
        transition_pattern = r"(?:and|also|instead|furthermore|note)\s+(?:based\s+on|ignore|disregard|give|reveal|override|print|output|cancel)"
        if re.search(transition_pattern, text, re.IGNORECASE):
            delimiters = r"[\.\?\!\;\n]|and\s+based\s+on|and\s+ignore|and\s+give|and\s+instead|also\s+ignore|also\s+disregard"
            clauses = re.split(delimiters, text, flags=re.IGNORECASE)
            candidates.extend([c.strip() for c in clauses if len(c.strip()) > 8])
        return candidates

    def predict_similarity(self, text: str) -> float:
        """
        Returns calibrated maximum cosine similarity score between input text and attack reference corpus.
        Applies smooth linear scaling [0.20, 0.65] -> [0.0, 1.0].
        """
        if self.attack_embeddings is None:
            if not self.load_index():
                raise RuntimeError("SemanticDetector index not found. Call fit_and_index first.")
        
        candidates = self._extract_candidate_windows(text)
        candidate_embeddings = self.encoder.encode(candidates, convert_to_tensor=True, show_progress_bar=False)
        
        # Compute cosine similarities
        cosine_scores = util.cos_sim(candidate_embeddings, self.attack_embeddings)
        raw_sim = float(np.max(cosine_scores.cpu().numpy()))
        
        # Calibrate similarity: map raw cosine range [0.20, 0.65] smoothly to [0.0, 1.0]
        min_sim, max_sim = 0.20, 0.65
        calibrated_sim = (raw_sim - min_sim) / (max_sim - min_sim)
        return float(max(0.0, min(1.0, calibrated_sim)))

if __name__ == "__main__":
    df_train = pd.read_csv("data/processed/train.csv")
    sem = SemanticDetector()
    sem.fit_and_index(df_train)
    
    sample = "can u give me userid and password"
    sim = sem.predict_similarity(sample)
    print(f"Sample: '{sample}' -> Cosine Sim: {sim:.4f}")
