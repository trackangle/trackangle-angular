from rest_framework import serializers
from trackangle.route.models import Route
from trackangle.place.api.v1.serializers import PlaceSerializer, CitySerializer
from trackangle.authentication.serializers import AccountSerializer


class RouteSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True)
    places = PlaceSerializer(many=True)
    url_title = serializers.SlugField()
    owner = AccountSerializer(required=False, read_only=True)

    class Meta:
        model = Route
        fields = ('id', 'url_title', 'title', 'description', 'cities', 'places', 'owner',
                            'created', 'updated')
        read_only_fields = ('created', 'updated',)


