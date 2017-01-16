from rest_framework import routers
from .views import PlaceViewSet
from django.conf.urls import url


place_router = routers.SimpleRouter()

place_router.register(r'', PlaceViewSet, base_name='place-base')