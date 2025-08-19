
from django.urls import path
from .views import SalvarResultadoView, HistoricoUsuarioView, RankingDiarioView

urlpatterns = [
    path('salvar/', SalvarResultadoView.as_view(), name='salvar_resultado'),
    # --- NOVAS ROTAS ---
    path('historico/', HistoricoUsuarioView.as_view(), name='historico_usuario'),
    path('ranking-diario/', RankingDiarioView.as_view(), name='ranking_diario'),
]