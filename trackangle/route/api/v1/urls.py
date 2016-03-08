from rest_framework import routers
from .views import RouteViewSet
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns


route_router = routers.SimpleRouter()

route_router.register(r'', RouteViewSet, base_name='route-base')