from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(user)
class userAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'fname', 'email']