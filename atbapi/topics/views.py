from rest_framework.viewsets import ModelViewSet
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import TopicSerializer
from .models import Topic
from .filters import TopicFilter

# Create your views here.
class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = TopicFilter
    ordering_fields = ['priority', 'name']