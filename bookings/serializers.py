from rest_framework import serializers
from .models import Hotel, Room, Booking, RoomType, User

# --- Public/User Serializers ---

class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = ['name', 'bed_type', 'max_occupancy']

class RoomSerializer(serializers.ModelSerializer):
    room_type = RoomTypeSerializer(read_only=True)
    class Meta:
        model = Room
        fields = ['id', 'room_number', 'price_per_night', 'room_type']

class HotelSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)  # Nested rooms for detail view

    class Meta:
        model = Hotel
        fields = ['id', 'name', 'location', 'description', 'amenities', 'image', 'rooms']

class BookingSerializer(serializers.ModelSerializer):
    # Display related data for user's My Bookings page
    hotel_name = serializers.CharField(source='room.hotel.name', read_only=True)
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    room_type_name = serializers.CharField(source='room.room_type.name', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'booking_id', 'room', 'hotel_name', 'room_number', 'room_type_name',
            'check_in_date', 'check_out_date', 'num_guests', 'total_price',
            'status', 'booked_on'
        ]
        read_only_fields = ['booking_id', 'total_price', 'status']
