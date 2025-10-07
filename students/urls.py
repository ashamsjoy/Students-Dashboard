from rest_framework.routers import DefaultRouter
from .views import StudentViewSet

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')

# The urlpatterns will include the automatically generated URLs (e.g., /students/, /students/{id}/)
urlpatterns = router.urls
