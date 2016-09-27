from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route
from django.shortcuts import get_object_or_404
from trackangle.route.models import RouteHasPlaces
from trackangle.route.models import RouteHasOwners
from trackangle.place.models import Place
from django.db import IntegrityError
from django.db import transaction
from django.forms.models import model_to_dict


class RouteViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    # def get_permissions(self):
    #     return (True,)

    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        print("create")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            places = serializer.validated_data.pop('places')

            route = Route.objects.create(**serializer.validated_data)

            routehasowners = RouteHasOwners(route=route, owner=request.user)
            routehasowners.save()

            for place in places:
                p = Place.objects.create(**place)
                routehasplaces = RouteHasPlaces(route=route, place=p)
                routehasplaces.save()

            return response.Response(status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic()
    def update(self, request, *args, **kwargs):
        print("update")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():

            places = serializer.validated_data.pop('places')

            route = Route.objects.update(kwargs['id'], **serializer.validated_data)
            #print(model_to_dict(route))


            try:
                routehasowners = RouteHasOwners(route=route, owner=request.user)
                routehasowners.save()
            except IntegrityError as e:
                print "Duplicate route owner"

            currentPlaceList = RouteHasPlaces.objects.filter(route=route)
            for place in currentPlaceList:
                place.delete()

            for place in places:
                p = Place.objects.create(**place)
                try:
                    routehasplaces = RouteHasPlaces(route=route, place=p)
                    routehasplaces.save()
                except IntegrityError as e:
                    print "Duplicate route place entry"

            return response.Response(status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        Route.objects.filter(pk=kwargs['id']).delete()
        return response.Response(status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        queryset = Route.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return response.Response(serializer.data)

    def retrieve(self, request, id):
        queryset = Route.objects.all()
        route = get_object_or_404(queryset, pk=id)
        serializer = self.serializer_class(route)
        return response.Response(serializer.data)