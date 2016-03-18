from rest_framework import serializers

from trackangle.route.models import Route
from trackangle.route.models import Place


class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'type',)


class RouteSerializer(serializers.ModelSerializer):

    places = PlaceSerializer(many=True)

    class Meta:
        model = Route
        fields = ('id', 'title', 'description', 'url_title',
                  'created', 'updated', 'places',)
        read_only_fields = ('created', 'updated',)

