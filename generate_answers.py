import fitz
import os
import re
import json

base_dir = r"C:\xampp\htdocs\english\LiveABC題庫(新)-20260330T200106Z-3-001\LiveABC題庫(新)"

answers_db = {}

for i in range(1, 5):
    test_num = str(i)
    pdf_path = os.path.join(base_dir, f"第{test_num}回 解析.pdf")
    
    if not os.path.exists(pdf_path):
        continue
        
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()
                
    matches = re.findall(r'Answer:\s*([A-D])', full_text, re.IGNORECASE)
    answers_db[f"test{test_num}"] = matches
    print(f"Test {test_num}: Found {len(matches)} answers.")

print(json.dumps(answers_db))
