import argparse
import os

import pandas as pd
from datasets import load_dataset


REQUIRED_COLUMNS = {"text", "label"}
OUTPUT_COLUMNS = [
    "id",
    "text",
    "label",
    "attack_type",
    "transformation",
    "difficulty",
    "source",
]


def _load_huggingface_rows(dataset_name: str) -> pd.DataFrame:
    print(f"[Dataset Loader] Fetching Hugging Face dataset '{dataset_name}'...")
    dataset = load_dataset(dataset_name)
    frames = [pd.DataFrame(dataset[split]) for split in dataset.keys()]
    if not frames:
        raise ValueError(f"Dataset '{dataset_name}' has no available splits.")

    df = pd.concat(frames, ignore_index=True)
    missing = REQUIRED_COLUMNS - set(df.columns)
    if missing:
        raise ValueError(
            f"Dataset '{dataset_name}' is missing required columns: {sorted(missing)}."
        )

    df = df[["text", "label"]].copy()
    df["text"] = df["text"].astype("string").str.strip()
    df["label"] = df["label"].map(
        lambda value: {
            "1": 1,
            "0": 0,
            "jailbreak": 1,
            "injection": 1,
            "2": 1,
            "malicious": 1,
            "attack": 1,
            "unsafe": 1,
            "benign": 0,
            "safe": 0,
            "normal": 0,
        }.get(str(value).strip().lower(), value)
    )
    df["label"] = pd.to_numeric(df["label"], errors="raise").astype(int)
    df = df.dropna(subset=["text", "label"])
    df = df[df["label"].isin([0, 1])]

    dataset_tag = dataset_name.replace("/", "_").replace("-", "_")
    df["attack_type"] = df["label"].map({1: "real_injection", 0: "none"})
    df["transformation"] = "original"
    df["difficulty"] = "medium"
    df["source"] = f"huggingface_{dataset_tag}"
    df["id"] = [f"hf_{dataset_tag}_{index:05d}" for index in range(len(df))]
    return df[OUTPUT_COLUMNS]


def _read_existing_samples(raw_dir: str) -> pd.DataFrame:
    paths = [
        os.path.join(raw_dir, "attack_samples.csv"),
        os.path.join(raw_dir, "benign_samples.csv"),
    ]
    frames = [pd.read_csv(path) for path in paths if os.path.exists(path)]
    return pd.concat(frames, ignore_index=True) if frames else pd.DataFrame()


def integrate_real_dataset(
    dataset_name: str = "deepset/prompt-injections",
    raw_dir: str = "data/raw",
) -> None:
    os.makedirs(raw_dir, exist_ok=True)
    df_huggingface = _load_huggingface_rows(dataset_name)
    df_existing = _read_existing_samples(raw_dir)

    df_combined = pd.concat([df_existing, df_huggingface], ignore_index=True)
    df_combined = df_combined.dropna(subset=["text", "label"])
    df_combined = df_combined.drop_duplicates(subset=["text"], keep="first")
    df_combined["label"] = pd.to_numeric(df_combined["label"], errors="raise").astype(int)
    df_combined = df_combined[OUTPUT_COLUMNS]

    attacks = df_combined[df_combined["label"] == 1]
    benign = df_combined[df_combined["label"] == 0]
    attacks.to_csv(os.path.join(raw_dir, "attack_samples.csv"), index=False)
    benign.to_csv(os.path.join(raw_dir, "benign_samples.csv"), index=False)

    print("[Dataset Loader] Dataset integration complete.")
    print(f"  - Attacks: {len(attacks)}")
    print(f"  - Benign: {len(benign)}")
    print(f"  - Total unique prompts: {len(df_combined)}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Integrate a Hugging Face prompt dataset.")
    parser.add_argument(
        "--dataset",
        default="deepset/prompt-injections",
        help="Hugging Face dataset identifier (default: deepset/prompt-injections)",
    )
    parser.add_argument("--raw-dir", default="data/raw")
    args = parser.parse_args()
    integrate_real_dataset(dataset_name=args.dataset, raw_dir=args.raw_dir)
