from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.place.api.v1.serializers import PlaceSerializer
from trackangle.authentication.serializers import AccountSerializer
from trackangle.route.models import Route
from django.shortcuts import get_object_or_404
from trackangle.route.models import RouteHasPlaces, RouteHasCities
from trackangle.place.models import Place, Comment, City
from django.db import IntegrityError, transaction
from rest_framework.decorators import detail_route,list_route
from rest_framework.permissions import IsAuthenticated
from django.template.defaultfilters import slugify


class RouteViewSet(viewsets.ModelViewSet):

    lookup_field = 'url_title'
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def get_serializer_context(self):
        return {'request': self.request}

    def create(self, request, *args, **kwargs):
        try:
            request.data['url_title'] = slugify(request.data['title'])
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                cities = serializer.validated_data['cities']
                with transaction.atomic():
                    route = Route.objects.create(request.user, **serializer.validated_data)
                    for cityObj in cities:
                        city = City(id=cityObj['id'], name=cityObj['name'], location_lat=cityObj['location_lat'], location_lng=cityObj['location_lng'])
                        city.save()
                        route_has_cities = RouteHasCities(route=route, city=city)
                        route_has_cities.save()

                    return response.Response(serializer.validated_data, status=status.HTTP_201_CREATED)
                return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(str(e))
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # TODO: make update function transactional
    def update(self, request, url_title, *args, **kwargs):
        try:
            #with transaction.atomic():
            request.data['url_title'] = slugify(request.data['title'])
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():

                cities = serializer.validated_data['cities']
                route = Route.objects.update(**serializer.validated_data)

                city_ids=[o["id"] for o in cities]
                RouteHasPlaces.objects.filter(route=route).exclude(place__city__id__in=city_ids).delete()
                RouteHasCities.objects.filter(route=route).delete()

                for cityObj in cities:
                    city = City(id=cityObj['id'], name=cityObj['name'], location_lat=cityObj['location_lat'], location_lng=cityObj['location_lng'])
                    city.save()
                    route_has_cities = RouteHasCities(route=route, city=city)
                    route_has_cities.save()

                return response.Response(serializer.validated_data, status=status.HTTP_200_OK)
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(str(e))
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, url_title, *args, **kwargs):
        Route.objects.filter(url_title=url_title).delete()
        return response.Response(status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(self.queryset, many=True)
            return response.Response(serializer.data)
        except Exception as e:
            print(str(e))
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, url_title):
        route = get_object_or_404(self.queryset, url_title=url_title)
        try:
            context = self.get_serializer_context()
            serializer = self.serializer_class(route, context=context)
            return response.Response(serializer.data)
        except Exception as e:
            print(str(e))
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['post'], permission_classes=[IsAuthenticated])
    def add_place(self, request, url_title=None, *args, **kwargs):
        try:
            with transaction.atomic():
                serializer = PlaceSerializer(data=request.data)
                if serializer.is_valid():
                    place = Place.objects.create(**serializer.validated_data)
                    route = get_object_or_404(self.queryset, url_title=url_title)
                    route_has_places = RouteHasPlaces(route_id=route.id, place=place)
                    route_has_places.save()
                    return response.Response(serializer.validated_data, status=status.HTTP_201_CREATED)
                return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(str(e))
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @detail_route(methods=['post'], permission_classes=[IsAuthenticated])
    def delete_place(self, request, url_title=None, *args, **kwargs):
        try:
            serializer = PlaceSerializer(data=request.data)
            if serializer.is_valid():
                place_id = serializer.validated_data['id']
                route = get_object_or_404(self.queryset, url_title=url_title)
                RouteHasPlaces.objects.filter(route_id=route.id, place_id=place_id).delete()
                return response.Response(serializer.validated_data, status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

