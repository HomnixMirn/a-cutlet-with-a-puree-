from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# Create your models here.

class event(models.Model):
    num_SM = models.IntegerField()
    name = models.CharField(max_length=150)
    date_start = models.DateField()
    date_end = models.DateField()
    location = models.CharField(max_length=150)
    participants = models.IntegerField()
    age_group = models.TextField()
    description = models.TextField()
    
    def __str__(self):
        return self.name

class user (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    fname = models.CharField(max_length=50)
    email = models.EmailField()
    time_zone = models.CharField(max_length=10)
    registered_events = models.ManyToManyField(event, blank=True)
    
    
    def __str__(self):
        return self.name
    
    def user_name(self):
        return self.user.username
    
    def get_events(self):
        return self.registered_events.all()
    

class userToken (Token):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
class quote (models.Model):
    img = models.ImageField(upload_to='founder_quote', blank=True)
    citation = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=100, blank=True)
    
    
