from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route
from django.shortcuts import get_object_or_404
from trackangle.route.models import RouteHasPlaces, RouteHasCities
from trackangle.route.models import RouteHasOwners
from trackangle.place.models import Place, Comment, Budget, Rating, City
from django.db import IntegrityError, transaction


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
            with transaction.atomic():
                serializer = self.serializer_class(data=request.data)
                if serializer.is_valid():
                    cities = serializer.validated_data.pop('cities')

                    route = Route.objects.create(**serializer.validated_data)

                    route_has_owners = RouteHasOwners(route=route, owner=request.user)
                    route_has_owners.save()

                    for cityObj in cities:
                        city = City(id=cityObj['id'], name=cityObj['name'], location_lat=cityObj['location_lat'], location_lng=cityObj['location_lng'])
                        city.save()
                        route_has_cities = RouteHasCities(route=route, city=city)
                        route_has_cities.save()

                    content = {"url_title": route.url_title}
                    return response.Response(content, status=status.HTTP_201_CREATED)
                return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception, e:
            print str(e)
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #TODO: make update function transactional
    def update(self, request, url_title, *args, **kwargs):
        try:
            #with transaction.atomic():
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():

                cities = serializer.validated_data.pop('cities')
                route = Route.objects.update(url_title, **serializer.validated_data)

                try:
                    route_has_owners = RouteHasOwners(route=route, owner=request.user)
                    route_has_owners.save()
                except IntegrityError as e:
                    print "Duplicate route owner"

                city_ids=[o["id"] for o in cities]
                RouteHasPlaces.objects.filter(route=route).exclude(place__city__id__in=city_ids).delete()
                RouteHasCities.objects.filter(route=route).delete()

                for cityObj in cities:
                    city = City(id=cityObj['id'], name=cityObj['name'], location_lat=cityObj['location_lat'], location_lng=cityObj['location_lng'])
                    city.save()
                    route_has_cities = RouteHasCities(route=route, city=city)
                    route_has_cities.save()

                content = {"url_title": route.url_title}
                return response.Response(content, status=status.HTTP_201_CREATED)
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception, e:
            print str(e)
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def destroy(self, request, url_title, *args, **kwargs):
        Route.objects.filter(url_title=url_title).delete()
        return response.Response(status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        try:
            queryset = Route.objects.all()
            serializer = self.serializer_class(queryset, many=True)
            return response.Response(serializer.data)
        except Exception,e:
            print str(e)
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, url_title):
        queryset = Route.objects.all()
        route = get_object_or_404(queryset, url_title=url_title)
        try:
            context = self.get_serializer_context()
            serializer = self.serializer_class(route, context=context)
            return response.Response(serializer.data)
        except Exception, e:
            print str(e)
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
