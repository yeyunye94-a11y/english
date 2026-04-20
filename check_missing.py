import fitz # PyMuPDF
import re

pdf_path = r"C:\xampp\htdocs\english\LiveABC題庫(新)-20260330T200106Z-3-001\LiveABC題庫(新)\第1回 解析.pdf"
doc = fitz.open(pdf_path)

text = ""
for page in doc:
    text += page.get_text()

# Find all occurrences of digits followed by dot, some context, and then "Answer:"
# Let's just find "Answer:" and print 50 characters before it to see the question number
matches = re.finditer(r'(.{0,50})Answer:\s*([A-D])', text, re.IGNORECASE | re.DOTALL)
for i, m in enumerate(matches):
    context = m.group(1).replace("\n", " ").strip()
    ans = m.group(2)
    # We just want to extract the number. Usually it's "X. " or "X. \n"
    # we'll look for digit(s) in the context
    nums = re.findall(r'(\d+)\.', context)
    if nums:
        print(f"Index {i+1}: Q. {nums[-1]} -> {ans}")
    else:
        print(f"Index {i+1}: Unknown Q -> {ans} | Context: {context}")
