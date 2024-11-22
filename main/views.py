from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
# from .serializers import *
from django.http import HttpRequest
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate 
import json
import re
# Create your views here.

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    return True if re.match(pattern, email) else False

@api_view(['POST'])
def register(request: HttpRequest):
    try:
        data = request.data
        print(data)
        username = data['username']
        password = data['password']
        email = data['email']
        if is_valid_email(email):
            if User.objects.filter(Q(username=username) | Q(email=email)).exists():
                return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            user.objects.create(user=User.objects.create_user(username=username, password=password, email=email), name=data['name'], fname=data['fname'], email=email)
            print('success')
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

{
"username" : "ad",
"password" : "admin",
"email" : "saasdasd@mail.ru",
"name" : "test",
"fname" : "giga"
}