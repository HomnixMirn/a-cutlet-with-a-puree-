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
import re
from datetime import datetime, timedelta
from .utils import send_email

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
        time_zone = data['time_zone']
        print(f'username: {username}, password: {password}, email: {email}, time_zone: {time_zone}')
        if is_valid_email(email):
            print(User.objects.filter(Q(username=username)))
            if User.objects.filter(Q(username=username)):
                return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user.objects.create(user=User.objects.create_user(username=username, password=password), name=data['name'], fname=data['fname'], email=email , time_zone=time_zone)
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
                token_obj = userToken.objects.get(key=token)
                user_obj = token_obj.user
                personal_info = user.objects.get(user=user_obj)
                serializer = UserSerializer(personal_info)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response( status=status.HTTP_204_NO_CONTENT)
        else:
            return Response( status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        data = request.data
        try:
            login = data['login']
            password = data['password']
            user_auth = authenticate(username=login, password=password)
            if user_auth is not None:
                token, _ = userToken.objects.get_or_create(user=user_auth)
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
        except Exception as e: 
            print(e)
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)

def create_event():
    data = get_data()
    for item in data:

            event.objects.get_or_create(**item)

@api_view(['GET'])
def get_events(request: HttpRequest, page: int = 0):
    if request.method == 'GET':
        events = event.objects.all()
        get = request.GET
        
        serializer = EventSerializer(events, many=True)
        if len(serializer.data) < 10:
            create_event()
            
        events = event.objects.all()
        if 'filters' in get:
            filters = request.GET['filters'].split(',')

            try:
                events = events.filter(Q(*[Q(age_group__icontains=filter.lower())  for filter in filters],_connector='OR'))
            except Exception as e:
                print(e)
        if "time" in get:
            time = request.GET['time']
            times = {
                'next_day' : datetime.now() + timedelta(days=1),
                'next_week' : datetime.now() + timedelta(days=7),
                'next_month' : datetime.now() + timedelta(days=30),
                'next_quarter' : datetime.now() + timedelta(days=90),
                'next_half_year' : datetime.now() + timedelta(days=180),
            }
            try:
                events = events.filter(date_start__lte=times[time])
            except Exception as e:
                print(e)
        if 'search' in get:
            search = request.GET['search']
            try:
                events = events.filter(Q(Q(location__contains=search.lower()) | Q(location__contains=search.upper()) | Q(location__contains=search.title())) | Q((Q(name__icontains=search.lower()) | Q(name__icontains=search.upper()) | Q(name__icontains=search.title()))))
            except Exception as e:
                print(e)
        serializer = EventSerializer(events, many=True)
        try:
            page = int(page)
        except:
            page = 0
        return Response(serializer.data[page*10:(page+1)*10], status=status.HTTP_200_OK)


@api_view(['GET'])
def get_event(request: HttpRequest, id: int):
    try:
        event_obj = event.objects.get(id=id)
        serializer = EventSerializer(event_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_latest_event(request: HttpRequest):
    events = event.objects.all().order_by('-date_start')[:2]
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def add_personal_event(request: HttpRequest):
    data = request.data
    headers = request.headers
    token = headers.get('Authorization')
    if token:
        try:
            token = token.split(' ')[1]
            token_obj = userToken.objects.get(key=token)
            user_obj = token_obj.user
            event_obj = event.objects.get(id=data['id'])
            user_events = user.objects.get(user=user_obj)
            print(user_events)
            print(event_obj)
            if event_obj in user_events.get_events():
                return Response({'error': 'Event already added'}, status=status.HTTP_400_BAD_REQUEST)
            
            user_events.registered_events.add(event_obj)
            
            return Response(status=status.HTTP_202_ACCEPTED)
        except Exception as e: 
            print(e)
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)
     
@api_view(['POST'])
def delete_personal_event(request: HttpRequest):
    data = request.data
    headers = request.headers
    token = headers.get('Authorization')
    if token:
        try:
            token = token.split(' ')[1]
            token_obj = userToken.objects.get(key=token)
            user_obj = token_obj.user
            event_obj = event.objects.get(id=data['id'])
            user_events = user.objects.get(user=user_obj)
            if event_obj in user_events.get_events():
                user_events.registered_events.remove(event_obj)
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e: 
            print(e)
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)