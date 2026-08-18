import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

def compute_security_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> dict:
    """
    Computes core security metrics: Accuracy, Precision, Recall, F1, FPR, FNR.
    """
    cm = confusion_matrix(y_true, y_pred, labels=[0, 1])
    tn, fp, fn, tp = cm.ravel()
    
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    
    fpr = fp / (fp + tn) if (fp + tn) > 0 else 0.0
    fnr = fn / (fn + tp) if (fn + tp) > 0 else 0.0
    
    return {
        "accuracy": round(float(acc), 4),
        "precision": round(float(prec), 4),
        "recall": round(float(rec), 4),
        "f1_score": round(float(f1), 4),
        "false_positive_rate": round(float(fpr), 4),
        "false_negative_rate": round(float(fnr), 4),
        "confusion_matrix": {
            "TN": int(tn),
            "FP": int(fp),
            "FN": int(fn),
            "TP": int(tp)
        }
    }

def evaluate_by_attack_type(df: pd.DataFrame, y_pred: np.ndarray) -> pd.DataFrame:
    """
    Evaluates detector performance broken down by attack category.
    """
    df_eval = df.copy()
    df_eval['pred'] = y_pred
    
    attack_rows = df_eval[df_eval['label'] == 1]
    grouped = attack_rows.groupby('attack_type')
    
    results = []
    for attack_type, group in grouped:
        acc = accuracy_score(group['label'], group['pred'])
        rec = recall_score(group['label'], group['pred'], zero_division=0)
        results.append({
            "attack_type": attack_type,
            "sample_count": len(group),
            "detection_rate_recall": round(float(rec), 4),
            "accuracy": round(float(acc), 4)
        })
        
    return pd.DataFrame(results)
