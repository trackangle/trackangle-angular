from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route
from django.shortcuts import get_object_or_404
from trackangle.route.models import RouteHasFoods
from trackangle.route.models import RouteHasMuseums
from trackangle.route.models import RouteHasShops
from trackangle.route.models import Food
from trackangle.route.models import Museum
from trackangle.route.models import Shop


class RouteViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            shops = serializer.validated_data.pop('shops')
            museums = serializer.validated_data.pop('museums')
            foods = serializer.validated_data.pop('foods')

            print(serializer.validated_data)
            route = Route.objects.create_route(**serializer.validated_data)

            for shop in shops:
                print(shop)
                place_id = shop.pop('place_id')
                print(place_id)
                #Shop.objects.create(route=route, **shop)
                saved_shop = Shop(place_id=place_id)
                saved_shop.save()
                route_has_shops = RouteHasShops(route=route, shop=saved_shop)
                route_has_shops.save()

            for museum in museums:
                print(museum)
                #Museum.objects.create(route=route, **museum)
                saved_museum = Museum(place_id=museum.pop('place_id'))
                saved_museum.save()
                route_has_museums = RouteHasMuseums(route=route, museum=saved_museum)
                route_has_museums.save()
            for food in foods:
                print(food)
                #Food.objects.create(route=route, **food)
                saved_food = Food(place_id=food.pop('place_id'))
                saved_food.save()
                route_has_foods = RouteHasFoods(route=route, food=saved_food)
                route_has_foods.save()

            return response.Response(status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        print("list")
        queryset = Route.objects.all()
        serializer = RouteSerializer(queryset, many=True)
        print(serializer.data)
        return response.Response(serializer.data)

    def retrieve(self, request, id):
        queryset = Route.objects.all()
        route = get_object_or_404(queryset, pk=id)
        serializer = RouteSerializer(route)
        return response.Response(serializer.data)