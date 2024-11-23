from rest_framework import serializers
from .models import *


class EventSerializer(serializers.ModelSerializer):
    registered_events = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = event
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):

    get_events = EventSerializer(many=True, read_only=True)
    class Meta:
        model = user
        fields = ['id', 'user_name', 'name', 'fname', 'email', 'get_events']

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = quote
        fields = "__all__"
        
        
        

        