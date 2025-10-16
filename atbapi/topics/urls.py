from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import TopicViewSet

router = DefaultRouter()
router.register(r'topics', TopicViewSet,basename='topic')

urlpatterns = [
    path('', include(router.urls)),
]