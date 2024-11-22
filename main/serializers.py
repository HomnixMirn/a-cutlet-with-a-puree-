from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id','user_username' 'name', 'fname', 'email']
        