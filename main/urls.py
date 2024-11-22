from django.contrib import admin
from django.urls import path, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path(r'^api/calendar/register$', views.register),
    re_path(r'^api/calendar/personal_info$', views.personal_info),
    re_path(r'^api/calendar/logout$', views.logout),
    re_path(r'^api/calendar/(?P<page>\d+)/get_events$', views.get_events),
    re_path(r'^api/calendar/$', views.get_latest_event),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)