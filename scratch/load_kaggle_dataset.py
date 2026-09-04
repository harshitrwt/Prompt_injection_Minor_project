import os
import pandas as pd

def integrate_kaggle_mpdd(sample_size_per_class: int = 1000):
    raw_dir = "data/raw"
    mpdd_path = os.path.join(raw_dir, "kaggle_mpdd", "MPDD.csv")
    
    if not os.path.exists(mpdd_path):
        raise FileNotFoundError(f"MPDD.csv not found at {mpdd_path}")
        
    print(f"[Kaggle MPDD Loader] Loading raw dataset from {mpdd_path}...")
    df_mpdd = pd.read_csv(mpdd_path)
    
    # Rename columns to standard schema
    df_mpdd = df_mpdd.rename(columns={"Prompt": "text", "isMalicious": "label"})
    df_mpdd = df_mpdd.dropna(subset=["text"])
    
    # Sample balanced subset for Phase 1 CPU efficiency
    df_malicious = df_mpdd[df_mpdd["label"] == 1].sample(n=sample_size_per_class, random_state=42)
    df_benign = df_mpdd[df_mpdd["label"] == 0].sample(n=sample_size_per_class, random_state=42)
    
    df_sampled = pd.concat([df_malicious, df_benign], ignore_index=True)
    df_sampled["attack_type"] = df_sampled["label"].apply(lambda l: "kaggle_mpdd_malicious" if l == 1 else "none")
    df_sampled["transformation"] = "original"
    df_sampled["difficulty"] = "medium"
    df_sampled["source"] = "kaggle_mpdd"
    df_sampled["id"] = [f"kaggle_{i:04d}" for i in range(len(df_sampled))]
    
    # Load curated & HuggingFace datasets if available
    atk_path = os.path.join(raw_dir, "attack_samples.csv")
    bng_path = os.path.join(raw_dir, "benign_samples.csv")
    
    df_combined_atk = pd.concat([pd.read_csv(atk_path) if os.path.exists(atk_path) else pd.DataFrame(), df_malicious], ignore_index=True)
    df_combined_bng = pd.concat([pd.read_csv(bng_path) if os.path.exists(bng_path) else pd.DataFrame(), df_benign], ignore_index=True)
    
    df_combined_atk.drop_duplicates(subset=["text"], inplace=True)
    df_combined_bng.drop_duplicates(subset=["text"], inplace=True)
    
    df_combined_atk.to_csv(atk_path, index=False)
    df_combined_bng.to_csv(bng_path, index=False)
    
    print(f"[Kaggle MPDD Loader] Successfully integrated Kaggle MPDD dataset!")
    print(f"  - Total Clean Attacks: {len(df_combined_atk)}")
    print(f"  - Total Benign Prompts: {len(df_combined_bng)}")
    print(f"  - Total Combined Dataset: {len(df_combined_atk) + len(df_combined_bng)} real samples saved to {raw_dir}")

if __name__ == "__main__":
    integrate_kaggle_mpdd()
