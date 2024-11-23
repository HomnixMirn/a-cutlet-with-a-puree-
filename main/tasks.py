import smtplib
import os
import datetime
import string
import random
import time
from load_dotenv import load_dotenv
load_dotenv()
from main.models import user
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText




def send_email():
    print('Запущено')
    while True:
        sender= os.getenv("email_login")
        
        try: 
            server = smtplib.SMTP(f"smtp.{sender.split('@')[1]}", 587)
            server.starttls()
            server.login(sender,os.getenv("email_password"))
        except Exception as _ex:
            print( f'{_ex}\n Проверьте правильно ли указанны ваши данные')
            break
        users = user.objects.all()
        for i in users:
            events =[]
            for j in i.registered_events.all():

                
                if j.date_start == (datetime.datetime.now() + datetime.timedelta(days=1)).date():
                    events.append(j)
            if datetime.datetime.now().hour - int(i.time_zone) == 12:
                msg=MIMEMultipart('alternative')
                msg['Subject'] = 'Не забудь о соревнованиях!'
                msg['From'] = sender
                msg['To'] = i.email
                # try:  
                # #   massage=f"""<html><head></head><body><p style='font-size:20px;'>Уже завтра начинаются соревнования! <span style='background: #c4c4c4; border-radius:10px; padding: 10px; font-size:24px'>{'\n'.join([i.name for i in events])}</span><br><br>Успехов в соревнованиях!</p></body></html>"""
                # except:
                #    massage=""
                   
                content= MIMEText(massage,'html')
                msg.attach(content)

                try: 
                    
                    server.sendmail(sender, i.email, msg.as_string())

                except Exception as _ex:
                    return f'{_ex}\n Проверьте правильно ли указанны ваши данные'
        server.quit()
        time.sleep(3600)
    