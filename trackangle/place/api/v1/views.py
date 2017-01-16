from rest_framework import viewsets, response, status

from trackangle.place.api.v1.serializers import PlaceSerializer, CommentSerializer, BudgetSerializer, RatingSerializer
from trackangle.route.models import RouteHasPlaces
from trackangle.place.models import Place, Comment, Budget, Rating
from django.db import IntegrityError, transaction
from rest_framework.decorators import detail_route,list_route
from rest_framework.permissions import IsAuthenticated


class PlaceViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def get_serializer_context(self):
        return {'request': self.request}


    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        return response.Response(serializer.data)

    def retrieve(self, request, id):
        data = None
        try:
            place = Place.objects.get(pk=id)
            context = self.get_serializer_context()
            serializer = self.serializer_class(place, context=context)
            data = serializer.data
        except:
            print("Place does not exist")
        return response.Response(data)

    @list_route(methods=['get'], permission_classes=[IsAuthenticated])
    def set_rating(self, request):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            rate = serializer.validated_data.pop('rate')
            rating, created = Rating.objects.get_or_create(rater=request.user, place_id = id, defaults={"rate":rate})
            rating.rate = rate
            rating.save()
            content = {"id": rating.id}
            return response.Response(content, status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)


    @detail_route(methods=['post'], permission_classes=[IsAuthenticated])
    def set_comment(self, request, id=None, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            text = serializer.validated_data.pop('text')
            comment, created = Comment.objects.get_or_create(place_id=id, author=request.user, defaults={"text": text})
            comment.text = text
            comment.save()
            content = {"id": comment.id}
            return response.Response(content, status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['post'], permission_classes=[IsAuthenticated])
    def set_budget(self, request, id=None, *args, **kwargs):
        serializer = BudgetSerializer(data=request.data)
        if serializer.is_valid():
            budgetObj = serializer.validated_data.pop('budget')
            budget, created = Budget.objects.get_or_create(owner=request.user, place_id = id, defaults={"budget":budgetObj})
            budget.budget = budgetObj
            budget.save()
            content = {"id": budget.id}
            return response.Response(content, status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['post'], permission_classes=[IsAuthenticated])
    def set_rating(self, request, id=None, *args, **kwargs):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            rate = serializer.validated_data.pop('rate')
            rating, created = Rating.objects.get_or_create(rater=request.user, place_id = id, defaults={"rate":rate})
            rating.rate = rate
            rating.save()
            content = {"id": rating.id}
            return response.Response(content, status=status.HTTP_201_CREATED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)
