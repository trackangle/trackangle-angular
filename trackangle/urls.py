from django.conf.urls import patterns, url, include

from trackangle.views import IndexView
from trackangle.authentication.urls import account_router
from trackangle.route.api.v1.urls import route_router
from trackangle.place.api.v1.urls import place_router
from trackangle.authentication.views import LoginView, LogoutView

api_urls = [
    url(r'^accounts', include(account_router.urls)),
    url(r'^route', include(route_router.urls)),
    url(r'^place', include(place_router.urls)),
]

urlpatterns = patterns(
    '',
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^api/v1/', include(api_urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)

