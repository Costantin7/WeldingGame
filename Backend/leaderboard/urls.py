# leaderboard/urls.py

from django.urls import path
from .views import SalvarResultadoView

urlpatterns = [
    path('salvar/', SalvarResultadoView.as_view(), name='salvar_resultado'),
]