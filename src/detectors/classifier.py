import os
import joblib
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import ExtraTreesClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression

class ClassifierDetector:
    def __init__(self, model_dir: str = "models/classifier"):
        self.model_dir = model_dir
        # Word & Sub-word Character N-Gram Vectorizer for subtle rephrasings
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 3),
            sublinear_tf=True,
            max_features=5000,
            strip_accents='unicode'
        )
        self.model = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
        self.is_trained = False
        os.makedirs(self.model_dir, exist_ok=True)

    def train(self, train_df: pd.DataFrame):
        """Train TF-IDF Vectorizer and Ensemble Classifier on training dataset."""
        X_train = train_df['clean_text']
        y_train = train_df['label']
        
        X_vec = self.vectorizer.fit_transform(X_train)
        self.model.fit(X_vec, y_train)
        self.is_trained = True
        
        self.save_model()
        print("[ClassifierDetector] Trained and saved Random Forest Ensemble model successfully.")

    def save_model(self):
        vec_path = os.path.join(self.model_dir, "vectorizer.joblib")
        model_path = os.path.join(self.model_dir, "logistic_model.joblib")
        joblib.dump(self.vectorizer, vec_path)
        joblib.dump(self.model, model_path)

    def load_model(self):
        vec_path = os.path.join(self.model_dir, "vectorizer.joblib")
        model_path = os.path.join(self.model_dir, "logistic_model.joblib")
        if os.path.exists(vec_path) and os.path.exists(model_path):
            self.vectorizer = joblib.load(vec_path)
            self.model = joblib.load(model_path)
            self.is_trained = True
            return True
        return False

    def predict_proba(self, text: str) -> float:
        """Returns probability P(malicious) between 0.0 and 1.0."""
        if not self.is_trained:
            if not self.load_index():
                if not self.load_model():
                    raise RuntimeError("ClassifierDetector model is not trained and no saved weights found.")
        
        X_vec = self.vectorizer.transform([text])
        proba = float(self.model.predict_proba(X_vec)[0][1])
        return proba

if __name__ == "__main__":
    df_train = pd.read_csv("data/processed/train.csv")
    clf = ClassifierDetector()
    clf.train(df_train)
    
    sample_bng = "HI my name is John and i want to learn about Agentic AI."
    score_bng = clf.predict_proba(sample_bng)
    print(f"Benign score for '{sample_bng}': {score_bng:.4f}")
