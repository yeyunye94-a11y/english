import PyPDF2
import os

pdf_path = r"C:\xampp\htdocs\english\LiveABC題庫(新)-20260330T200106Z-3-001\LiveABC題庫(新)\第1回 解析.pdf"
with open(pdf_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ""
    for i in range(min(5, len(reader.pages))): # read first 5 pages
        text += reader.pages[i].extract_text()
        
print(text.encode('utf-8', errors='ignore').decode('utf-8'))
