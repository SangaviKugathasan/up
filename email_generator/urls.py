from django.urls import path
from . import views

urlpatterns = [
    path('generate_email/', views.generate_email, name='generate_email'),  # Define the generate_email endpoint
]