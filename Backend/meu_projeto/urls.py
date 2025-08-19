"""
URL configuration for meu_projeto project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Inclui todas as rotas do seu app de autenticação e perfis
    path('api/', include('api.urls')),
    
    # Inclui as rotas do seu app de jogo (perguntas)
    # A URL final será, por exemplo: /game/perguntas/
    path('game/', include('welding.urls')),
    
    # Inclui as rotas do seu app de placar
    # A URL final será, por exemplo: /leaderboard/salvar/
    path('leaderboard/', include('leaderboard.urls')),
]