from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(user)
class userAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'fname', 'email']
    
    filter_horizontal = ['registered_events']
    
@admin.register(userToken)
class userTokenAdmin(admin.ModelAdmin):
    list_display = ['user', 'key']
    
    def key(self, obj):
        return obj.key
    
@admin.register(event)
class eventAdmin(admin.ModelAdmin):
    list_display = ['num_SM', 'name', 'date_start', 'date_end', 'location', 'participants', 'age_group' ]
    
    