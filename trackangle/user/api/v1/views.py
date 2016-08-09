from rest_framework import viewsets, response, status

from django.shortcuts import get_object_or_404

from trackangle.authentication.models import Account
from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Route.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = Route.objects.filter(routehasowners__owner_id=Account.objects.get(id=request.user.id).id)
        serializer = RouteSerializer(queryset, many=True)
        return response.Response(serializer.data)

    def retrieve(self, request, id):
        queryset = Route.objects.filter(routehasowners__owner_id=Account.objects.get(id=request.user.id).id)
        route = get_object_or_404(queryset, pk=id)
        serializer = RouteSerializer(route)
        return response.Response(serializer.data)
