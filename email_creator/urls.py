from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin
    path('auth/', include('email_generator.urls')),  # Include email_generator URLs
    path('auth/', include('dj_rest_auth.urls')),    # For authentication
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # For user registration
]