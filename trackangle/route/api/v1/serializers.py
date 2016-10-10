from rest_framework import serializers
from trackangle.route.models import Route, RouteHasPlaces, RouteHasCities
from trackangle.place.models import Place, City
from trackangle.place.api.v1.serializers import PlaceSerializer, CitySerializer
from trackangle.authentication.serializers import AccountSerializer
from django.core.exceptions import ValidationError
import collections


class RouteSerializer(serializers.ModelSerializer):
    cities = serializers.SerializerMethodField()
    owners = AccountSerializer(many=True, required=False,)
    url_title = serializers.SlugField(max_length=100, required=False)

    class Meta:
        model = Route
        fields = ('id', 'url_title', 'title', 'description', 'owners',
                  'created', 'updated', 'cities')
        read_only_fields = ('created', 'updated',)

    def to_internal_value(self, data):

        title = data.get('title')
        description = data.get('description')
        cities = data.get('cities')

        #Perform data validation
        if not title:
            raise ValidationError({
                'title': 'This field is required.'
            })
        if not description:
            raise ValidationError({
                'description': 'This field is required.'
            })
        if len(title) > 100:
            raise ValidationError({
                'title': 'May not be more than 100 characters.'
            })
        if len(description) > 255:
            raise ValidationError({
                'description': 'May not be more than 255 characters.'
            })


        print data
        return {
            'title': title,
            'description': description,
            'cities': cities
        }

    #def get_places(self, obj):
     #   route_places = RouteHasPlaces.objects.filter(route_id=obj.id)
     #   places = []
     #   for route_place in route_places:
     #       places += Place.objects.filter(id=route_place.place_id)
     #   if len(places) != 0:
     #       serialized = PlaceSerializer(places, context=self.context, many=True)
     #       return serialized.data
     #   return []

    def get_cities(self, obj):
        route_cities = RouteHasCities.objects.filter(route_id=obj.id)
        cities = []
        for route_city in route_cities:
            cities += City.objects.filter(id=route_city.city_id)
        if len(cities) != 0:
            self.context['route_id'] = obj.id
            serialized = CitySerializer(cities, context=self.context, many=True)
            return serialized.data
        return []



