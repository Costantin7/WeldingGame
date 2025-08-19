
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

# --- NOVA VIEW PARA O HISTÓRICO DO UTILIZADOR ---
class HistoricoUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        query_data_str = request.query_params.get('data', None)

        # Filtra os resultados pelo ID do jogador
        resultados = Leaderboard.objects.filter(id_player=usuario.id)

        # Se uma data for fornecida, filtra por essa data
        if query_data_str:
            try:
                query_data = datetime.strptime(query_data_str, '%Y-%m-%d').date()
                resultados = resultados.filter(data=query_data)
            except ValueError:
                return Response({'erro': 'Formato de data inválido. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

        # Ordena do mais recente para o mais antigo
        resultados = resultados.order_by('-data')
        serializer = LeaderboardSerializer(resultados, many=True)
        return Response(serializer.data)

# --- NOVA VIEW PARA O RANKING DIÁRIO ---
class RankingDiarioView(APIView):
    permission_classes = [AllowAny] # O ranking pode ser público

    def get(self, request):
        hoje = date.today()
        
        # Pega todos os resultados de hoje e ordena-os
        ranking_completo = Leaderboard.objects.filter(data=hoje).order_by('-nivel_max', 'tempo')
        
        # Pega os 10 primeiros
        top_10 = ranking_completo[:10]
        
        posicao_usuario = None
        # Se o utilizador estiver autenticado, encontra a sua posição
        if request.user.is_authenticated:
            # Encontra o melhor resultado do utilizador hoje
            melhor_resultado_usuario = ranking_completo.filter(id_player=request.user.id).first()
            
            if melhor_resultado_usuario:
                # Converte o queryset para uma lista para encontrar o índice
                lista_ranking = list(ranking_completo)
                try:
                    rank = lista_ranking.index(melhor_resultado_usuario) + 1
                    posicao_usuario = {
                        'rank': rank,
                        'dados': LeaderboardSerializer(melhor_resultado_usuario).data
                    }
                except ValueError:
                    # Não deve acontecer, mas é uma salvaguarda
                    posicao_usuario = None

        serializer_top10 = LeaderboardSerializer(top_10, many=True)
        
        return Response({
            'top_10': serializer_top10.data,
            'posicao_usuario': posicao_usuario
        })