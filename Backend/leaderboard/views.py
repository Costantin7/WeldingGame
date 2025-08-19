# leaderboard/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import LeaderboardSerializer
from .models import Leaderboard
from datetime import date, datetime

class SalvarResultadoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        usuario_logado = request.user
        dados_partida = {
            'tempo': request.data.get('tempo'),
            'nivel_max': request.data.get('nivel_max'),
            'modulos': request.data.get('modulos')
        }
        dados_partida['id_player'] = usuario_logado.id
        dados_partida['nickname'] = usuario_logado.username
        dados_partida['pais'] = usuario_logado.profile.pais if hasattr(usuario_logado, 'profile') else 'N/A'
        dados_partida['data'] = date.today()
        serializer = LeaderboardSerializer(data=dados_partida)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HistoricoUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        query_data_str = request.query_params.get('data', None)
        resultados = Leaderboard.objects.filter(id_player=usuario.id)
        if query_data_str:
            try:
                query_data = datetime.strptime(query_data_str, '%Y-%m-%d').date()
                resultados = resultados.filter(data=query_data)
            except ValueError:
                return Response({'erro': 'Formato de data inválido. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)
        resultados = resultados.order_by('-data')
        serializer = LeaderboardSerializer(resultados, many=True)
        return Response(serializer.data)

class RankingDiarioView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        hoje = date.today()
        
        # --- LÓGICA CORRIGIDA ---
        # Para aplicar múltiplos filtros no mesmo campo, encadeamos as chamadas .filter()
        ranking_completo = Leaderboard.objects.filter(
            data=hoje
        ).filter(
            modulos__contains="Processos"
        ).filter(
            modulos__contains="Materiais"
        ).filter(
            modulos__contains="Projeto"
        ).filter(
            modulos__contains="Fabricação"
        ).order_by('-nivel_max', 'tempo') # Ordena por nível (descendente) e tempo (ascendente)
        
        top_10 = ranking_completo[:10]
        
        posicao_usuario = None
        if request.user.is_authenticated:
            # A busca pelo melhor resultado do utilizador também usará o filtro de "todos os módulos"
            melhor_resultado_usuario = ranking_completo.filter(id_player=request.user.id).first()
            
            if melhor_resultado_usuario:
                lista_ranking = list(ranking_completo)
                try:
                    rank = lista_ranking.index(melhor_resultado_usuario) + 1
                    posicao_usuario = {
                        'rank': rank,
                        'dados': LeaderboardSerializer(melhor_resultado_usuario).data
                    }
                except ValueError:
                    posicao_usuario = None

        serializer_top10 = LeaderboardSerializer(top_10, many=True)
        
        return Response({
            'top_10': serializer_top10.data,
            'posicao_usuario': posicao_usuario
        })
