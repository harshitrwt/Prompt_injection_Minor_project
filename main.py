import os
import sys

# Ensure root workspace directory is in python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Disable TF/Keras import in transformers and force PyTorch backend
os.environ["USE_TF"] = "0"
os.environ["USE_TORCH"] = "1"

# Pre-flight environment package check
import importlib.util

missing_packages = [pkg for pkg in ["sklearn", "pandas", "sentence_transformers"] if importlib.util.find_spec(pkg) is None]
if missing_packages:
    print("\n" + "!"*70)
    print(f" [ERROR] Missing required Python packages: {', '.join(missing_packages)}")
    print(" On Windows, please use 'python main.py' or 'py main.py' instead of 'python3'.")
    print(f" Current Executable: {sys.executable}")
    print("!"*70 + "\n")
    sys.exit(1)

import argparse
import pandas as pd
from src.pipeline.security_pipeline import SecurityPipeline
from src.evaluation.benchmark import run_benchmark

def print_header():
    print("=" * 68)
    print("      PROMPT INJECTION DEFENSE MIDDLEWARE (PHASE 1 CORE DETECTOR)     ")
    print("      Research Prototype: Learned Weighted Signal Fusion Middleware    ")
    print("=" * 68)

def interactive_cli(pipeline: SecurityPipeline):
    print("\nEnter a prompt to analyze through the security middleware.")
    print("Type 'exit' or 'quit' to end session.\n")
    
    while True:
        try:
            user_input = input("\n[Prompt Input] > ").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit", "q"]:
                print("Exiting security middleware inspection tool. Goodbye!")
                break
                
            res = pipeline.analyze_prompt(user_input)
            detectors = res['detectors']
            fusion = res['fusion_output']
            
            print("-" * 60)
            print(f" INPUT PROMPT: \"{user_input}\"")
            print("-" * 60)
            print(" DETECTOR SIGNALS:")
            print(f"   1. ML Classifier (TF-IDF + LogReg) P(malicious): {detectors['ml_classifier']['probability']:.4f}")
            print(f"   2. Heuristic Rule Score:                      {detectors['heuristic_engine']['score']:.4f} (Matches: {detectors['heuristic_engine']['matched_count']})")
            if detectors['heuristic_engine']['matches']:
                for match in detectors['heuristic_engine']['matches']:
                    print(f"      - Matched Pattern [{match['category']}]: weight={match['weight']}")
            sem_det = detectors['semantic_detector']
            print(f"   3. Semantic Similarity Score:                  {sem_det['similarity']:.4f} (Engine: {sem_det.get('engine', 'local')}, Cosine: {sem_det.get('raw_cosine', 0):.4f})")
            if sem_det.get('matched_threat') and sem_det['matched_threat'].get('text'):
                matched_txt = sem_det['matched_threat']['text'][:60]
                matched_type = sem_det['matched_threat'].get('attack_type', 'unknown')
                print(f"      - Nearest Signature: \"{matched_txt}...\" [Type: {matched_type}]")
            print("-" * 60)
            
            # Highlight decision status
            decision = fusion['decision']
            badge = f"[{decision}]"

            print(f" LEARNED WEIGHTED FUSION RESULT:")
            print(f"   - Final Risk Score: {fusion['risk_score']:.4f}")
            print(f"   - Security Decision: {badge} (Level: {fusion['risk_level']})")
            print("-" * 60)
            
        except KeyboardInterrupt:
            print("\nExiting CLI.")
            break
        except Exception as e:
            print(f"Error evaluating prompt: {e}")

def main():
    print_header()
    parser = argparse.ArgumentParser(description="Prompt Injection Defense Middleware CLI")
    parser.add_argument("--benchmark", action="store_true", help="Run benchmark evaluation on test dataset")
    parser.add_argument("--prompt", type=str, help="Evaluate a single prompt from command line")
    
    args = parser.parse_args()
    
    pipeline = SecurityPipeline()
    if not pipeline.load_pipeline():
        print("[System] No pre-trained models found. Training pipeline components...")
        train_df = pd.read_csv("data/processed/train.csv")
        val_df = pd.read_csv("data/processed/validation.csv")
        pipeline.train_pipeline(train_df, val_df)
    else:
        print("[System] Pre-trained models loaded successfully.")

    if args.benchmark:
        run_benchmark()
    elif args.prompt:
        res = pipeline.analyze_prompt(args.prompt)
        print(res)
    else:
        interactive_cli(pipeline)

if __name__ == "__main__":
    main()
