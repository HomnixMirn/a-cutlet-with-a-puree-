import requests
import ssl
import socket


url = 'https://storage.minsport.gov.ru/cms-uploads/cms/II_chast_EKP_2024_14_11_24_65c6deea36.pdf'


context = ssl.create_default_context()
response = requests.get(url,verify='ssl/localhost.pem')
print(response.content)