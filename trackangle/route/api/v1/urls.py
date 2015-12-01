from rest_framework import routers
from .views import RouteViewSet

route_router = routers.SimpleRouter()

route_router.register(r'', RouteViewSet, base_name='route-base')
