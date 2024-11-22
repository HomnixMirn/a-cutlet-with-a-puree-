from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter

def extract_text_from_pdf(file_path):
    output_string = StringIO()

    with open(file_path, 'rb') as in_file:
        parser = PDFParser(in_file)
        doc = PDFDocument(parser)
        rsrcmgr = PDFResourceManager()
        device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        for page in PDFPage.create_pages(doc):
            interpreter.process_page(page)

    return output_string.getvalue()

pdf_file_path = 'main/1.pdf'
text = extract_text_from_pdf(pdf_file_path)

# Записываем результат в файл
with open('output.txt', 'w', encoding='utf-8') as out_file:
    out_file.write(text)

print('Результат записан в файл output.txt')