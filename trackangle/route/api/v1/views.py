from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route
from django.shortcuts import get_object_or_404
from trackangle.route.models import RouteHasPlaces
from trackangle.route.models import RouteHasOwners
from trackangle.place.models import Place


class RouteViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def create(self, request, *args, **kwargs):
        print("create")
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            places = serializer.validated_data.pop('places')
            print(places)

            route = Route.objects.create_route(**serializer.validated_data)
            routehasowners = RouteHasOwners(route=route, owner=request.user)
            routehasowners.save()


            for place in places:
                p = Place.objects.create(**place)
                routehasplaces = RouteHasPlaces(route=route, place=p)
                routehasplaces.save()

            return response.Response(status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = Route.objects.all()
        serializer = RouteSerializer(queryset, many=True)
        return response.Response(serializer.data)

    def retrieve(self, request, id):
        queryset = Route.objects.all()
        route = get_object_or_404(queryset, pk=id)
        serializer = RouteSerializer(route)
        return response.Response(serializer.data)