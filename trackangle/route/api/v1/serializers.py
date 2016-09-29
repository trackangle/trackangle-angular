from rest_framework import serializers
from trackangle.route.models import Route, RouteHasPlaces
from trackangle.place.models import Place
from trackangle.place.api.v1.serializers import PlaceSerializer
from trackangle.authentication.serializers import AccountSerializer
from django.core.exceptions import ValidationError
import collections


class RouteSerializer(serializers.ModelSerializer):
    #places = PlaceSerializer(many=True, required=False,)
    places = serializers.SerializerMethodField()
    owners = AccountSerializer(many=True, required=False,)

    class Meta:
        model = Route
        fields = ('id', 'title', 'description', 'url_title', 'owners',
                  'created', 'updated', 'places',)
        read_only_fields = ('created', 'updated',)

    def to_internal_value(self, data):

        title = data.get('title')
        description = data.get('description')
        url_title = data.get('url_title')
        places = data.get('places')

        #Perform data validation
        if not title:
            raise ValidationError({
                'title': 'This field is required.'
            })
        if not description:
            raise ValidationError({
                'description': 'This field is required.'
            })
        if not url_title:
            raise ValidationError({
                'url_title': 'This field is required.'
            })
        if len(title) > 100:
            raise ValidationError({
                'title': 'May not be more than 100 characters.'
            })
        if len(description) > 255:
            raise ValidationError({
                'description': 'May not be more than 255 characters.'
            })
        if len(url_title) > 100:
            raise ValidationError({
                'url_title': 'May not be more than 100 characters.'
            })


        print data
        return {
            'title': title,
            'description': description,
            'url_title': url_title,
            'places': places
        }

    def get_places(self, obj):
        route_places = RouteHasPlaces.objects.filter(route_id=obj.id)
        places = []
        for route_place in route_places:
            places += Place.objects.filter(id=route_place.place_id)
        if len(places) != 0:
            serialized = PlaceSerializer(places, context=self.context, many=True)
            return serialized.data
        return []



