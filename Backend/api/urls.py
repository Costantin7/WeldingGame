# api/urls.py
from django.urls import path
from .views import RegisterView # Certifique-se de importar suas views

urlpatterns = [
    # A rota /api/register/ será gerenciada pela nossa RegisterView.
    path('register/', RegisterView.as_view(), name='auth_register'),
    # Adicione outras rotas aqui conforme necessário
]