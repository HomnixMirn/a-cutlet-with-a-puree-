from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# Create your models here.

class user (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    fname = models.CharField(max_length=50)
    email = models.EmailField()
    time_zone = models.CharField(max_length=10)
    
    
    def __str__(self):
        return self.name
    
    def user_username(self):
        return self.user.username
    

class userToken (Token):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user
    
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