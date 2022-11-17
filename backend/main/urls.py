from django.urls import path
from . import views

from .views import (
    RegistriraniView,
)

urlpatterns = [
    path('', views.index, name='index'),
    path('register', RegistriraniView.as_view()),
]