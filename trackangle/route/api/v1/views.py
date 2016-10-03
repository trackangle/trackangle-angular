from rest_framework import viewsets, response, status

from trackangle.route.api.v1.serializers import RouteSerializer
from trackangle.route.models import Route
from django.shortcuts import get_object_or_404
from trackangle.route.models import RouteHasPlaces
from trackangle.route.models import RouteHasOwners
from trackangle.place.models import Place, Comment, Budget, Rating
from django.db import IntegrityError, transaction


class RouteViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    # def get_permissions(self):
    #     return (True,)

    def get_serializer_context(self):
        return {'request': self.request}

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                serializer = self.serializer_class(data=request.data)
                if serializer.is_valid():
                    places = serializer.validated_data.pop('places')

                    route = Route.objects.create(**serializer.validated_data)

                    routehasowners = RouteHasOwners(route=route, owner=request.user)
                    routehasowners.save()

                    for place in places:
                        p = Place.objects.create(**place)
                        Comment.objects.filter(place=p, author=request.user).delete()
                        comments = place.pop('comments')
                        for commentObj in comments:
                            if commentObj['text']:
                                comment = Comment(text=commentObj['text'], place=p, author=request.user)
                                comment.save()
                        Rating.objects.filter(place=p, rater=request.user).delete()
                        ratings = place.pop('ratings')
                        for ratingObj in ratings:
                            if ratingObj['rate']:
                                rating = Rating(rate=ratingObj['rate'], place=p, rater=request.user)
                                rating.save()
                        Budget.objects.filter(place=p, owner=request.user).delete()
                        budgets = place.pop('budgets')
                        for budgetObj in budgets:
                            if budgetObj['budget']:
                                budget = Budget(budget=budgetObj['budget'], place=p, owner=request.user)
                                budget.save()
                        routehasplaces = RouteHasPlaces(route=route, place=p)
                        routehasplaces.save()

                    return response.Response(status=status.HTTP_201_CREATED)
                return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception,e :
            print str(e)
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #TODO: make update function transactional
    #@transaction.atomic()
    def update(self, request, id, *args, **kwargs):
        try:
            #with transaction.atomic():
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():

                places = serializer.validated_data.pop('places')
                route = Route.objects.update(id, **serializer.validated_data)

                try:
                    routehasowners = RouteHasOwners(route=route, owner=request.user)
                    routehasowners.save()
                except IntegrityError as e:
                    print "Duplicate route owner"

                RouteHasPlaces.objects.filter(route=route).delete()

                for place in places:
                    p = Place.objects.create(**place)
                    Comment.objects.filter(place=p, author=request.user).delete()
                    comments = place.pop('comments')
                    for commentObj in comments:
                        if commentObj['text']:
                            comment = Comment(text=commentObj['text'], place=p, author=request.user)
                            comment.save()
                    Rating.objects.filter(place=p, rater=request.user).delete()
                    ratings = place.pop('ratings')
                    for ratingObj in ratings:
                        if ratingObj['rate']:
                            rating = Rating(rate=ratingObj['rate'], place=p, rater=request.user)
                            rating.save()
                    Budget.objects.filter(place=p, owner=request.user).delete()
                    budgets = place.pop('budgets')
                    for budgetObj in budgets:
                        if budgetObj['budget']:
                            budget = Budget(rate=budgetObj['budget'], place=p, owner=request.user)
                            budget.save()
                    try:
                        routehasplaces = RouteHasPlaces(route=route, place=p)
                        routehasplaces.save()
                    except IntegrityError as e:
                        print "Duplicate route place entry"

                return response.Response(status=status.HTTP_201_CREATED)
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception, e:
            print str(e)
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def destroy(self, request, id, *args, **kwargs):
        Route.objects.filter(pk=id).delete()
        return response.Response(status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        queryset = Route.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return response.Response(serializer.data)

    def retrieve(self, request, id):
        queryset = Route.objects.all()
        route = get_object_or_404(queryset, pk=id)
        try:
            context = self.get_serializer_context()
            serializer = self.serializer_class(route, context=context)
            return response.Response(serializer.data)
        except Exception, e:
            print str(e)
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
