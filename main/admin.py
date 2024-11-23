from django.contrib import admin
from .models import *
from django.utils.html import format_html
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
    
@admin.register(quote)
class quoteAdmin(admin.ModelAdmin):
    list_display = ['name','icon_tag','citation']
    
    def icon_tag(self, obj):
        if not obj.img:
            return 'No icon'
        return format_html('<img src="{}" width="100" height="100"/>'.format(obj.img.url))
    icon_tag.short_description = 'Icon'