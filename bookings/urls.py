from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HotelViewSet, BookingCreateView, MyBookingsView

router = DefaultRouter()
router.register(r'hotels', HotelViewSet)

urlpatterns = [
    # Hotel search/list/retrieve
    path('', include(router.urls)), 
    # User booking
    path('bookings/', BookingCreateView.as_view(), name='booking-create'),
    path('bookings/my-bookings/', MyBookingsView.as_view(), name='my-bookings'),
    # path('bookings/<str:booking_id>/download-pdf/', DownloadPDFView.as_view(), name='download-pdf'),
]
