from django.conf.urls import patterns, url, include

from trackangle.views import IndexView
from trackangle.authentication.urls import account_router


api_urls = [
    url(r'^account', include(account_router.urls))
]

urlpatterns = patterns(
    '',
    url('^api-1\.0/', include(api_urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)

