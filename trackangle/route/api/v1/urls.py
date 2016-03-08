from rest_framework import routers
from .views import RouteViewSet
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns


route_router = routers.SimpleRouter()

route_router.register(r'', RouteViewSet, base_name='route-base')



route_list = RouteViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
route_detail = RouteViewSet.as_view({
    'get': 'retrieve',
    #'put': 'update',
    #'patch': 'partial_update',
    #'delete': 'destroy'
})


urlpatterns = format_suffix_patterns([
    url(r'^(?P<pk>[0-9]+)/$', route_detail,  name='route-detail'),
    url(r'^/$', route_list, name='route-list'),
])