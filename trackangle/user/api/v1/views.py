from django.http import JsonResponse
from rest_framework import viewsets, response, status

from django.shortcuts import get_object_or_404

from trackangle.authentication.models import Account
from trackangle.authentication.serializers import AccountSerializer
from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route,RouteHasOwners



class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()


    def list(self, request,  *args, **kwargs):

        return response.Response()



    def retrieve(self, request, username, *args, **kwargs):
        account = Account.objects.get(username=username)
        print(account)
        route_has_owners = RouteHasOwners.objects.filter(owner=account)
        route_list = []
        for x in route_has_owners:
            owner_routes = x.route
            route_serializer = RouteSerializer(owner_routes)
            route_list.append(route_serializer.data)
        return response.Response(route_list)





