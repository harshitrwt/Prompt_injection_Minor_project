import os
import pandas as pd
from datasets import load_dataset

def integrate_real_dataset():
    raw_dir = "data/raw"
    os.makedirs(raw_dir, exist_ok=True)
    
    print("[Dataset Loader] Fetching HuggingFace 'deepset/prompt-injections' benchmark dataset...")
    hf_ds = load_dataset("deepset/prompt-injections")
    
    df_train_hf = pd.DataFrame(hf_ds["train"])
    df_test_hf = pd.DataFrame(hf_ds["test"])
    df_hf = pd.concat([df_train_hf, df_test_hf], ignore_index=True)
    
    # Map features
    df_hf["attack_type"] = df_hf["label"].apply(lambda l: "real_injection" if l == 1 else "none")
    df_hf["transformation"] = "original"
    df_hf["difficulty"] = "medium"
    df_hf["source"] = "huggingface_deepset"
    df_hf["id"] = [f"hf_{i:04d}" for i in range(len(df_hf))]
    
    # Load existing curated samples
    atk_path = os.path.join(raw_dir, "attack_samples.csv")
    bng_path = os.path.join(raw_dir, "benign_samples.csv")
    
    df_curated_atk = pd.read_csv(atk_path) if os.path.exists(atk_path) else pd.DataFrame()
    df_curated_bng = pd.read_csv(bng_path) if os.path.exists(bng_path) else pd.DataFrame()
    
    df_curated = pd.concat([df_curated_atk, df_curated_bng], ignore_index=True)
    
    # Combine curated and HuggingFace real datasets
    df_combined = pd.concat([df_curated, df_hf], ignore_index=True)
    df_combined.drop_duplicates(subset=["text"], inplace=True)
    
    df_combined_atk = df_combined[df_combined["label"] == 1]
    df_combined_bng = df_combined[df_combined["label"] == 0]
    
    df_combined_atk.to_csv(os.path.join(raw_dir, "attack_samples.csv"), index=False)
    df_combined_bng.to_csv(os.path.join(raw_dir, "benign_samples.csv"), index=False)
    
    print(f"[Dataset Loader] Dataset Integration Complete!")
    print(f"  - Total Clean Attacks: {len(df_combined_atk)}")
    print(f"  - Total Benign Samples: {len(df_combined_bng)}")
    print(f"  - Combined Total Dataset: {len(df_combined)} real samples saved to {raw_dir}")

if __name__ == "__main__":
    integrate_real_dataset()
