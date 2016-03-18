from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route
from django.shortcuts import get_object_or_404
from trackangle.route.models import RouteHasPlaces
from trackangle.route.models import Place


class RouteViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            places = serializer.validated_data.pop('places')

            print(serializer.validated_data)
            route = Route.objects.create_route(**serializer.validated_data)

            for place in places:
                place_id = place.pop('id')
                place_type = place.pop('type')
                #Place.objects.create(route=route, **shop)
                saved_place = Place(id=place_id, type=place_type)
                saved_place.save()
                route_has_places = RouteHasPlaces(route=route, place=saved_place)
                route_has_places.save()

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