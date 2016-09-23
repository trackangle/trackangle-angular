from rest_framework import serializers

from trackangle.route.models import Place


class PlaceSerializer(serializers.ModelSerializer):

    id = serializers.CharField()
    location_lat = serializers.CharField()
    location_lng = serializers.CharField()
    city = serializers.CharField()
    type = serializers.IntegerField()
    class Meta:
        model = Place
        fields = ('id', 'type', 'location_lat', 'location_lng', 'city',)