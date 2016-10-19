from rest_framework import routers
from .views import UserViewSet
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns


user_router = routers.SimpleRouter()

user_router.register(r'', UserViewSet, base_name='user-base')