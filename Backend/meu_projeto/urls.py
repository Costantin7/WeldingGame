"""
URL configuration for meu_projeto project.
"""
from django.contrib import admin
from django.urls import path, include

# 1. IMPORTE AS VIEWS DO SIMPLEJWT (LINHA NOVA)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('welding.urls')),
    path('api/', include('api.urls')),

    # 2. ADICIONE A URL DE LOGIN (LINHA NOVA)
    # Rota para obter o token: http://127.0.0.1:8000/api/token/
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # 3. ADICIONE A URL PARA ATUALIZAR O TOKEN (LINHA NOVA)
    # Rota para renovar o token de acesso
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]