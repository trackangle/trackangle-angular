from rest_framework import serializers

from trackangle.route.models import Place


class PlaceSerializer(serializers.ModelSerializer):

    id = serializers.CharField()
    type = serializers.IntegerField()
    class Meta:
        model = Place
        fields = ('id', 'type',)