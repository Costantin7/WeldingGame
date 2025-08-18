# api/views.py

from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
# Adicione os novos imports
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    """
    Endpoint da API para registro de usuários.
    """
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserProfileView(APIView):
    """
    Endpoint para buscar os dados do usuário logado.
    Exige autenticação.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView):
    """
    View de login que usa nosso serializer customizado.
    """
    serializer_class = MyTokenObtainPairSerializer