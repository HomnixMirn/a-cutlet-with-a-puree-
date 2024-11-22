from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id','user_username' 'name', 'fname', 'email']
        
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event
        fields = ['id', 'num_SM', 'name', 'date_start', 'date_end', 'location', 'participants', 'age_group', 'description']
        