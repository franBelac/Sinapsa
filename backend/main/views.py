from django.shortcuts import render
from datetime import date
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .serializers import RegistriraniSerializer
from .models import Registrirani

def index(request):
    return HttpResponse("POCETNA STRANICA")

class RegistriraniView(APIView):

    # 1. List all
    def get(self, request, *args, **kwargs):
        regs = Registrirani.objects.all()
        serializer = RegistriraniSerializer(regs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
            'firstname': request.data.get('name'), 
            'lastname': request.data.get('surname'),
            'username': request.data.get('username'),
            'useravatar': request.data.get('avatar'), 
            'password': request.data.get('password'), 
            'email': request.data.get('email'),
            'created': date.today(),  
        }
        serializer = RegistriraniSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)