import PyPDF2
import re

pdf_path = r"C:\xampp\htdocs\english\LiveABC題庫(新)-20260330T200106Z-3-001\LiveABC題庫(新)\第1回 解析.pdf"
with open(pdf_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"

# Find all occurrences of "第X部分" and the question numbers that follow
matches = re.finditer(r'(第[一二三四五六七八九十]+部分[^\n]*)\n.*?(\d+)\.', text, re.DOTALL)
for match in matches:
    part_name = match.group(1).strip()
    first_q = match.group(2)
    # Just printing a summary of where we find "部分" and the next digit
    # We will slice to print only a bit of text after the "部分" to verify
    print(f"Found: {part_name} - First Q: {first_q}")
