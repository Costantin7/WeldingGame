# api/urls.py

from django.urls import path
# Importe as novas views
from .views import RegisterView, UserProfileView, MyTokenObtainPairView

urlpatterns = [
    # Rota de registro (existente)
    path('register/', RegisterView.as_view(), name='auth_register'),
    

    
    # Rota de login (token) que agora aceita username ou email
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Rota para buscar os dados do usuário logado
    path('user/me/', UserProfileView.as_view(), name='user_profile'),
]