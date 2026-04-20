import PyPDF2
import re

pdf_path = r"C:\xampp\htdocs\english\LiveABC題庫(新)-20260330T200106Z-3-001\LiveABC題庫(新)\第1回 題目.pdf"
with open(pdf_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"

# Just find "Part" and print 50 characters around it to see context
matches = re.finditer(r'Part\s*\d', text, re.IGNORECASE)
for m in matches:
    start = max(0, m.start() - 30)
    end = min(len(text), m.end() + 100)
    print("MATCH:", text[start:end].replace('\n', ' '))
