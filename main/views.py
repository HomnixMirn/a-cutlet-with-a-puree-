from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from .serializers import *
from django.http import HttpRequest
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate 
from .parse.sorting_data import get_data
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

@api_view(['GET','POST'])
def personal_info(request: HttpRequest):
    if request.method == 'GET':
        headers = request.headers
        token = headers.get('Authorization')
        if token:
            
            try:
                token = token.split(' ')[1]
                token_obj = Token.objects.get(key=token)
                user_obj = token_obj.user
                personal_info = user.objects.get(user=user_obj)
                serializer = UserSerializer(personal_info)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Token.DoesNotExist:
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == 'POST':
        data = request.data
        try:
            login = data['login']
            password = data['password']
            user = authenticate(username=login, password=password)
            if user is not None:
                token, _ = userToken.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid login or password'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
def logout(request: HttpRequest):
    headers = request.headers
    token = headers.get('Authorization')
    if token:
        try:
            token = token.split(' ')[1]
            token_obj = userToken.objects.get(key=token)
            token_obj.delete()
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
def get_events(request: HttpRequest):
    events = event.objects.all()
    serializer = EventSerializer(events, many=True)
    if len(serializer.data) <= 10:
        data = get_data()
        for item in data:

            event.objects.get_or_create(**item)
        events = event.objects.all()
        serializer = EventSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

    
    