from rest_framework import serializers
from .models import Registrirani
class RegistriraniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registrirani
        fields = '__all__'