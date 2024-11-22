from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
# from .serializers import *
from django.http import HttpRequest
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate 
import json
# Create your views here.

