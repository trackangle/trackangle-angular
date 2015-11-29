from rest_framework import routers
from .views import AccountViewSet

account_router = routers.SimpleRouter()

account_router.register(r'', AccountViewSet, base_name='account-base')