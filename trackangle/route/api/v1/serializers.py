from rest_framework import serializers
from trackangle.route.models import Route
from trackangle.place.api.v1.serializers import PlaceSerializer
from trackangle.authentication.serializers import AccountSerializer


class RouteSerializer(serializers.ModelSerializer):
    places = PlaceSerializer(many=True, required=False,)
    owners = AccountSerializer(many=True, required=False,)

    class Meta:
        model = Route
        fields = ('id', 'title', 'description', 'url_title', 'owners',
                  'created', 'updated', 'places',)
        read_only_fields = ('created', 'updated',)
