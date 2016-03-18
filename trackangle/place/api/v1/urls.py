from rest_framework import routers
from .views import PlaceViewSet
from django.conf.urls import url


route_router = routers.SimpleRouter()

route_router.register(r'', PlaceViewSet, base_name='place-base')