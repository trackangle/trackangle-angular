from rest_framework import serializers

from trackangle.route.models import Route
from trackangle.route.models import Shop
from trackangle.route.models import Food
from trackangle.route.models import Museum


class ShopSerializer(serializers.ModelSerializer):
    place_id = serializers.CharField()

    class Meta:
        model = Shop
        fields = ('place_id',)


class FoodSerializer(serializers.ModelSerializer):
    place_id = serializers.CharField()

    class Meta:
        model = Food
        fields = ('place_id',)


class MuseumSerializer(serializers.ModelSerializer):
    place_id = serializers.CharField()

    class Meta:
        model = Museum
        fields = ('place_id',)


class RouteSerializer(serializers.ModelSerializer):

    shops = ShopSerializer(many=True)
    museums = MuseumSerializer(many=True)
    foods = FoodSerializer(many=True)

    class Meta:
        model = Route
        fields = ('id', 'title', 'description', 'url_title', 'created', 'updated',
                  'shops', 'museums', 'foods',)
        read_only_fields = ('created', 'updated',)

