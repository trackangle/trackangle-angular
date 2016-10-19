from django.http import JsonResponse
from rest_framework import viewsets, response, status

from django.shortcuts import get_object_or_404

from trackangle.authentication.models import Account
from trackangle.authentication.serializers import AccountSerializer
from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route,RouteHasOwners



class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    serializer_class = AccountSerializer
    queryset = Account.objects.all()




    def list(self, request,  *args, **kwargs):
        '''   account = Account.objects.get(username=username)
   print("aaaaaaaaaaaaaa: "+account)
   route_has_owners = RouteHasOwners.objects.filter(owner=account)
   owner_routes = route_has_owners.route
   owner_routes = RouteSerializer(owner_routes, many=True)
   print(account)'''
        return response.Response()



    def retrieve(self, request, username, *args, **kwargs):
        account = Account.objects.get(username=username)
        print(account)
        route_has_owners = RouteHasOwners.objects.filter(owner=account)
        owner_routes = route_has_owners[1].route
        owner_routes = RouteSerializer(owner_routes)
        print(owner_routes.data)
        return response.Response(owner_routes.data)





