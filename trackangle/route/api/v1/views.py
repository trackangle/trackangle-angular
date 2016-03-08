from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route
from django.shortcuts import get_object_or_404


class RouteViewSet(viewsets.ModelViewSet):

    lookup_field = 'url_title'
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def create(self, request, *args, **kwargs):
        print("asdasds")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Route.objects.create_route(**serializer.validated_data)
            return response.Response(status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, pk=None):
        queryset = Route.objects.all()
        route = get_object_or_404(queryset, pk=pk)
        serializer = RouteSerializer(route)
        return response.Response(serializer.data)