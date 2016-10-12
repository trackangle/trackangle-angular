from rest_framework import viewsets, response, status

from trackangle.place.api.v1.serializers import PlaceSerializer
from django.shortcuts import get_object_or_404
from trackangle.place.models import Place


class PlaceViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def get_serializer_context(self):
        return {'request': self.request}

    def list(self, request, *args, **kwargs):
        queryset = Place.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return response.Response(serializer.data)

    def retrieve(self, request, id):
        data = None
        try:
            place = Place.objects.get(pk=id)
            context = self.get_serializer_context()
            serializer = self.serializer_class(place, context=context)
            data = serializer.data
        except:
            print "Place does not exist"
        return response.Response(data)
