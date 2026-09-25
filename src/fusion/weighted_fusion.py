import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

class WeightedFusionLayer:
    def __init__(
        self,
        model_dir: str = "models/fusion",
        semantic_review_threshold: float = 0.50,
        semantic_block_threshold: float = 0.70,
        ml_high_threshold: float = 0.75,
        rule_high_threshold: float = 0.70,
    ):
        self.model_dir = model_dir
        self.semantic_review_threshold = semantic_review_threshold
        self.semantic_block_threshold = semantic_block_threshold
        self.ml_high_threshold = ml_high_threshold
        self.rule_high_threshold = rule_high_threshold
        self.meta_classifier = RandomForestClassifier(n_estimators=50, max_depth=6, random_state=42)
        self.is_trained = False
        os.makedirs(self.model_dir, exist_ok=True)

    def _extract_fusion_features(self, p_ml: float, p_rule: float, p_semantic: float) -> np.ndarray:
        """Extracts non-linear interaction features for the meta-classifier."""
        max_sig = max(p_ml, p_rule, p_semantic)
        min_sig = min(p_ml, p_rule, p_semantic)
        mean_sig = (p_ml + p_rule + p_semantic) / 3.0
        # Multi-signal synergy feature
        synergy = 1.0 if (p_ml >= 0.50 and p_rule >= 0.50) or (p_rule >= 0.50 and p_semantic >= 0.50) or (p_ml >= 0.50 and p_semantic >= 0.50) else 0.0
        return np.array([p_ml, p_rule, p_semantic, max_sig, min_sig, mean_sig, synergy])

    def train_fusion(self, feature_matrix: np.ndarray, labels: np.ndarray):
        """
        Trains non-linear Random Forest meta-classifier on signal matrix [p_ml, p_rule, p_semantic].
        """
        # Build non-linear interaction features for training
        X_fusion = np.array([self._extract_fusion_features(row[0], row[1], row[2]) for row in feature_matrix])
        
        if len(np.unique(labels)) < 2:
            self.is_trained = True
        else:
            self.meta_classifier.fit(X_fusion, labels)
            self.is_trained = True
            self.save_model()
            
        print(f"[WeightedFusionLayer] Trained non-linear Stacking Meta-Classifier successfully.")

    def save_model(self):
        meta_path = os.path.join(self.model_dir, "meta_classifier.joblib")
        joblib.dump(self.meta_classifier, meta_path)

    def load_model(self) -> bool:
        meta_path = os.path.join(self.model_dir, "meta_classifier.joblib")
        if os.path.exists(meta_path):
            self.meta_classifier = joblib.load(meta_path)
            self.is_trained = True
            return True
        return False

    def predict_risk(self, p_ml: float, p_rule: float, p_semantic: float) -> dict:
        """
        Combines three detection signals using Stacking Meta-Classifier & Decision Boundaries.
        """
        if self.is_trained or self.load_model():
            feat = self._extract_fusion_features(p_ml, p_rule, p_semantic).reshape(1, -1)
            raw_prob = float(self.meta_classifier.predict_proba(feat)[0][1])
        else:
            raw_prob = (0.45 * p_ml + 0.35 * p_rule + 0.20 * p_semantic)

        # A semantic match alone is evidence for review, not enough evidence to block.
        max_signal = max(p_ml, p_rule, p_semantic)
        strong_ml = p_ml >= self.ml_high_threshold
        strong_rule = p_rule >= self.rule_high_threshold
        semantic_match = p_semantic >= self.semantic_review_threshold
        semantic_block_match = p_semantic >= self.semantic_block_threshold
        corroborated_semantic = semantic_block_match and (p_ml >= 0.50 or p_rule >= 0.50)

        if strong_rule or strong_ml or corroborated_semantic:
            risk_score = max(raw_prob, max_signal * 0.85)
        elif semantic_match:
            risk_score = min(raw_prob, 0.49)
        elif p_rule == 0.0 and p_semantic < 0.40 and p_ml < 0.65:
            # Suppress false positives on benign questions
            risk_score = min(raw_prob, 0.25)
        else:
            risk_score = raw_prob
            
        risk_score = max(0.0, min(1.0, risk_score))

        # Security Decision Boundaries
        if risk_score >= 0.50:
            decision = "BLOCK"
            risk_level = "HIGH"
        elif risk_score >= 0.30:
            decision = "REVIEW"
            risk_level = "MEDIUM"
        else:
            decision = "SAFE"
            risk_level = "LOW"

        return {
            "risk_score": round(risk_score, 4),
            "decision": decision,
            "risk_level": risk_level,
            "signal_vector": {
                "p_ml": round(p_ml, 4),
                "p_rule": round(p_rule, 4),
                "p_semantic": round(p_semantic, 4)
            }
        }

if __name__ == "__main__":
    fusion = WeightedFusionLayer()
    res = fusion.predict_risk(p_ml=0.65, p_rule=0.0, p_semantic=0.35)
    print(f"Fusion Test Result: {res}")
