# api/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegisterSerializer

# Usamos CreateAPIView, uma view genérica para criar objetos.
class RegisterView(generics.CreateAPIView):
    """
    Endpoint da API para registro de usuários.
    """
    # Define o queryset (não muito usado em 'create', mas necessário).
    queryset = User.objects.all()
    
    # Permite que qualquer usuário (mesmo não autenticado) acesse este endpoint.
    permission_classes = (permissions.AllowAny,)
    
    # Especifica o serializer que esta view deve usar.
    serializer_class = RegisterSerializer
