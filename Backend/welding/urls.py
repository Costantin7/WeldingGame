from django.urls import path
from .views import EscolherPergunta

urlpatterns = [
    path('perguntas/', EscolherPergunta.as_view()),  # a rota que o React chama
]
