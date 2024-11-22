import pdfplumber
import re

from datetime import datetime

def pdf_to_txt(pdf_file_path, txt_file_path):
    with open(txt_file_path, 'w', encoding='utf-8') as out_file:
        with pdfplumber.open(pdf_file_path) as pdf:
            text = ''
            date = datetime.now().strftime('%d.%m.%Y')
            date = datetime.strptime(date.strip(), '%d.%m.%Y').date()
            start = False
            printable = True
            for page in pdf.pages:
                
                text_page = page.extract_text()
                for line in text_page.split('\n'):
                    lin = []
                    if line == "ЕКП (дисциплина, программа) (спортивная база, центр) (чел.)":
                        start = True
                        continue
                    if start:
                        
                        if line.strip() != '':
                            for word in line.split(' '):
                                if len(word) ==16 and word.isdigit():
                                    word = 'START : ' + word
                                    printable = True
                                
                                
                                if re.match(r"\d{2}\.\d{2}\.\d{4}", word.strip()):
                                    date_line = datetime.strptime(word.strip(), '%d.%m.%Y').date()
                                    if date_line < date:
                                        printable = True
                                        
                            
                                lin.append(word)
                            if printable:      
                                out_file.write(' '.join(lin) + '\n\n')
                break

                
        
            

pdf_file_path = 'main/1.pdf'
txt_file_path = 'output.txt'
pdf_to_txt(pdf_file_path, txt_file_path)

print('PDF-файл преобразован в TXT-файл')

