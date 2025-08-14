from django.contrib import admin
from .models import Profile # Importe o seu modelo aqui

# Registe o seu modelo para que ele apareça no painel
admin.site.register(Profile)