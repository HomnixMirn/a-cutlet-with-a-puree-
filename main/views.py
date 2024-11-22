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
# Create your views here.

@api_view(['POST'])
def register(request: HttpRequest):
    try:
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        email = data['email']
        created_user = User.objects.create_user(username=username, password=password)
        user.objects.create(user=created_user, name=data['name'], fname=data['fname'], email=email)
        
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    