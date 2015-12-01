from django.conf.urls import patterns, url, include

from trackangle.views import IndexView
from trackangle.authentication.urls import account_router
from trackangle.route.api.v1.urls import route_router


api_urls = [
    url(r'^account', include(account_router.urls)),
    url(r'^route', include(route_router.urls)),
]

urlpatterns = patterns(
    '',
    url('^api-1\.0/', include(api_urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)

