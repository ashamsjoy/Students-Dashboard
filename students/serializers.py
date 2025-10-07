from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        # 'id' is crucial for retrieval, update, and delete operations
        fields = ('id', 'name', 'email', 'course', 'marks')
