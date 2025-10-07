from rest_framework import viewsets
# Import the filter backends
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Student
from .serializers import StudentSerializer
 
class StudentViewSet(viewsets.ModelViewSet):
    """
    A ViewSet that automatically provides 'list', 'create', 'retrieve',
    'update', and 'destroy' actions for the Student model.
    """
    queryset = Student.objects.all().order_by('id')
    serializer_class = StudentSerializer
    
    # Configure filtering and searching
    # Note: We include both to allow for filtering (?course=Science) and searching (?search=John)
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['name', 'course', 'email'] # Fields available for the 'search' parameter
    filterset_fields = ['course'] # Fields available for exact filtering
