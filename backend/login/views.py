from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .models import Registrirani
from django.db import models
import jwt, datetime
import json

def index(request):
    print(request.data)
    return HttpResponse("kue")

class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        print(username + " " + password)
        user = Registrirani.objects.filter(username=username).first()

        if user is None:
            return JsonResponse({'status':'USER NE POSTOJI'} , status=status.HTTP_400_BAD_REQUEST)

        req_pass = user.password
        if req_pass != password:
            return JsonResponse({'status':'KRIVA LOZINKA'} , status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'status':'LOGIRAN'} , status=status.HTTP_200_OK)
        #Ivek
        #1234