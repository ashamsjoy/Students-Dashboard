from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Hotel, Room, Booking
from .serializers import HotelSerializer, BookingSerializer

# --- Permission Classes ---

class IsAdminUserOrReadOnly(permissions.BasePermission):
    """ Allows write access only to administrators. """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated and getattr(request.user, 'is_admin', False)

# --- Public Views ---

class HotelViewSet(viewsets.ReadOnlyModelViewSet):
    """ List and retrieve hotels. Read-only for public. """
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    # Custom permission to allow GET requests by anyone, but restrict POST/PUT/DELETE
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        # Basic search logic (Refined Search View is separate)
        queryset = super().get_queryset()
        location = self.request.query_params.get('location')
        if location:
            queryset = queryset.filter(location__icontains=location)
        return queryset

class BookingCreateView(generics.CreateAPIView):
    """ User booking creation. """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # **Crucial: Implement room availability check logic here**
        room = serializer.validated_data['room']
        check_in = serializer.validated_data['check_in_date']
        check_out = serializer.validated_data['check_out_date']

        # Check if room is booked during the requested period
        is_booked = Booking.objects.filter(
            room=room,
            check_in_date__lt=check_out,
            check_out_date__gt=check_in,
            status='CONFIRMED'
        ).exists()

        if is_booked or not getattr(room, 'is_available', True):
            raise serializers.ValidationError({"room": "The selected room is unavailable for these dates."})

        # Calculate total price (Simplified)
        import datetime
        duration = (check_out - check_in).days
        total_price = room.price_per_night * duration
        
        serializer.save(user=self.request.user, total_price=total_price)

class MyBookingsView(generics.ListAPIView):
    """ View all current and past bookings for the logged-in user. """
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-check_in_date')

# --- PDF Download View (requires a library like ReportLab or WeasyPrint) ---
# Omitted for brevity, but this view would:
# 1. Fetch the booking data.
# 2. Use the PDF library to render an HTML template into a PDF file.
# 3. Serve the PDF file as an HTTP response.
