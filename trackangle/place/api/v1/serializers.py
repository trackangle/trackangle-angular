from rest_framework import serializers

from trackangle.route.models import Place


class PlaceSerializer(serializers.ModelSerializer):

    id = serializers.CharField()
    location_lat = serializers.CharField()
    location_lng = serializers.CharField()
    type = serializers.IntegerField()
    rating = serializers.FloatField()
    budget = serializers.FloatField()
    comment = serializers.CharField()
    class Meta:
        model = Place
        fields = ('id', 'type', 'location_lat', 'location_lng', 'rating', 'budget', 'comment')