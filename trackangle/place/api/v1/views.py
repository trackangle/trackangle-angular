from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import PlaceSerializer
from django.shortcuts import get_object_or_404
from trackangle.route.models import Place


class PlaceViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def list(self, request, *args, **kwargs):
        queryset = Place.objects.all()
        serializer = PlaceSerializer(queryset, many=True)
        return response.Response(serializer.data)

    def retrieve(self, request, id):
        queryset = Place.objects.all()
        place = get_object_or_404(queryset, pk=id)
        serializer = PlaceSerializer(place)
        return response.Response(serializer.data)