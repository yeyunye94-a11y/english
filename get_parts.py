import fitz # PyMuPDF
import re

pdf_path = r"C:\xampp\htdocs\english\LiveABC題庫(新)-20260330T200106Z-3-001\LiveABC題庫(新)\第1回 解析.pdf"
doc = fitz.open(pdf_path)

text = ""
for page in doc:
    text += page.get_text()

# We look for "第X部分" or "Part X"
# Print out all occurrences with some context to verify boundaries
for match in re.finditer(r'(第[一二三四五六七]部分|Part \d)(.{0,50})', text.replace('\n', ' ')):
    print(match.group(0))
