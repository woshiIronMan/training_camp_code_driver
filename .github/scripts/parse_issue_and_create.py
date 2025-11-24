import os
import re
import sys

issue_body = os.getenv("ISSUE_BODY", "").strip()
issue_number = os.getenv("ISSUE_NUMBER", "unknown")

VALID_DOMAINS = {"人工智能", "硬件开发", "网络安全", "软件开发"}
pattern = r"(人工智能|硬件开发|网络安全|软件开发)[：:\s]+([A-Za-z0-9_\-]+)"
match = re.search(pattern, issue_body, re.IGNORECASE)

if match:
    domain = match.group(1)
    username = match.group(2).strip()

    if not re.fullmatch(r"[A-Za-z0-9_\-]+", username):
        print("::set-output name=success::false")
        sys.exit(0)

    target_dir = f"{domain}/{username}"
    os.makedirs(target_dir, exist_ok=True)

    with open(f"{target_dir}/README.md", "w", encoding="utf-8") as f:
        f.write(f"# 这里是{username}的仓库👋\n{username} 的 {domain} 空间\n\n由 Issue #{issue_number} 自动创建。")

    print(f"::set-output name=domain::{domain}")
    print(f"::set-output name=username::{username}")
    print("::set-output name=success::true")
    print(f"✅ Added {username} to {domain}")
else:
    print("::set-output name=success::false")
    print("❌ No valid pattern found.")