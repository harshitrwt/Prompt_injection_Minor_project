#!/usr/bin/env python3
"""
Qdrant Cloud Keep-Alive Cronjob
--------------------------------
Pings the Qdrant Cloud cluster and runs a lightweight point retrieval
to keep the free-tier vector database active and prevent auto-hibernation.
"""

import os
import sys
import datetime
import requests
from dotenv import load_dotenv

# Ensure environment variables are loaded
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(base_dir, ".env")
load_dotenv(env_path)

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "prompt_injections")

def ping_qdrant() -> bool:
    timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
    print(f"[{timestamp}] Starting Qdrant Cloud Keep-Alive Ping...")

    if not QDRANT_URL or not QDRANT_API_KEY:
        print(f"[{timestamp}] [ERROR] Missing QDRANT_URL or QDRANT_API_KEY in environment.")
        return False

    headers = {
        "api-key": QDRANT_API_KEY,
        "Content-Type": "application/json"
    }

    try:
        # Step 1: Health / Cluster ping
        resp = requests.get(f"{QDRANT_URL}/collections", headers=headers, timeout=15)
        if resp.status_code != 200:
            print(f"[{timestamp}] [WARNING] /collections returned status code: {resp.status_code}")
            return False

        collections = resp.json().get("result", {}).get("collections", [])
        col_names = [c["name"] for c in collections]
        print(f"[{timestamp}] Cluster healthy. Available collections: {col_names}")

        # Step 2: Collection status & real point query to simulate genuine user activity
        if COLLECTION_NAME in col_names:
            col_resp = requests.get(f"{QDRANT_URL}/collections/{COLLECTION_NAME}", headers=headers, timeout=15)
            col_info = col_resp.json().get("result", {})
            points_count = col_info.get("points_count", 0)
            status = col_info.get("status", "unknown")
            print(f"[{timestamp}] Collection '{COLLECTION_NAME}': status={status}, total points={points_count}")

            # Active query: scroll 1 point to register read activity on the index
            scroll_resp = requests.post(
                f"{QDRANT_URL}/collections/{COLLECTION_NAME}/points/scroll",
                headers=headers,
                json={"limit": 1, "with_payload": False, "with_vector": False},
                timeout=15
            )
            if scroll_resp.status_code == 200:
                print(f"[{timestamp}] [SUCCESS] Active query executed. Cluster activity refreshed successfully!")
                return True
            else:
                print(f"[{timestamp}] [WARNING] Scroll query returned code: {scroll_resp.status_code}")
                return True
        else:
            print(f"[{timestamp}] [INFO] Collection '{COLLECTION_NAME}' not found in cluster.")
            return True

    except Exception as e:
        print(f"[{timestamp}] [ERROR] Failed to communicate with Qdrant Cloud: {e}")
        return False

if __name__ == "__main__":
    success = ping_qdrant()
    sys.exit(0 if success else 1)
