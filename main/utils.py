
from .tasks import send_email

from threading import Thread
from django.apps import apps



if apps.is_installed('main'):

    x= Thread(target=send_email)
    x.daemon = True
    x.start()

        
    
    

