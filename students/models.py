from django.db import models



	
class Student(models.Model):
	name = models.CharField(max_length=100)
	email = models.EmailField(unique=True) 
	course = models.CharField(max_length=50)
	marks = models.DecimalField(max_digits=5, decimal_places=2)

	class Meta:
		ordering = ['name']  

	def __str__(self):
		return self.name
