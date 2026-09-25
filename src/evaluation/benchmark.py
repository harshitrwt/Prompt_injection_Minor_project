import os
import sys

# Ensure root workspace directory is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

import pandas as pd
import numpy as np
from src.pipeline.security_pipeline import SecurityPipeline
from src.evaluation.metrics import compute_security_metrics, evaluate_by_attack_type

def run_benchmark(
    test_path: str = "data/processed/test.csv",
    results_dir: str = "results"
):
    os.makedirs(results_dir, exist_ok=True)
    
    test_df = pd.read_csv(test_path)
    y_true = test_df['label'].values
    
    pipeline = SecurityPipeline()
    # Attempt loading existing trained pipeline, or train if needed
    if not pipeline.load_pipeline():
        train_df = pd.read_csv("data/processed/train.csv")
        val_df = pd.read_csv("data/processed/validation.csv")
        pipeline.train_pipeline(train_df, val_df)
        
    print(f"\n========================================================")
    print(f"       RUNNING PHASE 1 BENCHMARK EVALUATION             ")
    print(f"========================================================")
    print(f"Test Dataset: {len(test_df)} samples (Attacks: {sum(y_true==1)}, Benign: {sum(y_true==0)})\n")
    
    preds_ml = []
    preds_rule = []
    preds_sem = []
    preds_fusion = []
    
    for _, row in test_df.iterrows():
        text = row['clean_text']
        analysis = pipeline.analyze_prompt(text)
        
        p_ml = analysis['detectors']['ml_classifier']['probability']
        p_rule = analysis['detectors']['heuristic_engine']['score']
        p_sem = analysis['detectors']['semantic_detector']['similarity']
        decision = analysis['fusion_output']['decision']
        
        # Standalone predictions using standard 0.5 threshold
        preds_ml.append(1 if p_ml >= 0.5 else 0)
        preds_rule.append(1 if p_rule >= 0.5 else 0)
        preds_sem.append(1 if p_sem >= 0.5 else 0)
        
        # Fusion prediction: BLOCK or REVIEW treated as injection flag (1)
        preds_fusion.append(1 if decision in ["BLOCK", "REVIEW"] else 0)
        
    metrics_ml = compute_security_metrics(y_true, np.array(preds_ml))
    metrics_rule = compute_security_metrics(y_true, np.array(preds_rule))
    metrics_sem = compute_security_metrics(y_true, np.array(preds_sem))
    metrics_fusion = compute_security_metrics(y_true, np.array(preds_fusion))
    
    summary_data = [
        {"Detector / Model": "1. ML Classifier (TF-IDF + Random Forest)", **metrics_ml},
        {"Detector / Model": "2. Heuristic Engine (Rules)", **metrics_rule},
        {"Detector / Model": "3. Semantic Embedding Sim", **metrics_sem},
        {"Detector / Model": "4. PROPOSED WEIGHTED FUSION", **metrics_fusion},
    ]
    
    df_summary = pd.DataFrame(summary_data)
    
    print("--- BENCHMARK RESULTS COMPARISON ---")
    print(df_summary[["Detector / Model", "accuracy", "precision", "recall", "f1_score", "false_positive_rate", "false_negative_rate"]].to_string(index=False))
    
    # Save benchmark summary
    summary_csv = os.path.join(results_dir, "benchmark_comparison.csv")
    df_summary.to_csv(summary_csv, index=False)
    print(f"\nSaved benchmark comparison table to {summary_csv}")
    
    # Attack Type Breakdown for Fusion pipeline
    df_attack_breakdown = evaluate_by_attack_type(test_df, np.array(preds_fusion))
    print("\n--- PROPOSED FUSION DETECTION RATE BY ATTACK TYPE ---")
    print(df_attack_breakdown.to_string(index=False))
    
    breakdown_csv = os.path.join(results_dir, "attack_breakdown.csv")
    df_attack_breakdown.to_csv(breakdown_csv, index=False)

if __name__ == "__main__":
    run_benchmark()
