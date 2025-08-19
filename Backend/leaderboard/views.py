# leaderboard/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import LeaderboardSerializer
from datetime import date

class SalvarResultadoView(APIView):
    # Exige que o usuário esteja autenticado
    permission_classes = [IsAuthenticated]

    def post(self, request):
        usuario_logado = request.user
        
        # Pega os dados da partida enviados pelo frontend
        dados_partida = {
            'tempo': request.data.get('tempo'),
            'nivel_max': request.data.get('nivel_max'),
            'modulos': request.data.get('modulos')
        }

        # Preenche os dados do usuário a partir do backend (mais seguro)
        dados_partida['id_player'] = usuario_logado.id
        dados_partida['nickname'] = usuario_logado.username
        # Busca o país do perfil associado ao usuário
        dados_partida['pais'] = usuario_logado.profile.pais if hasattr(usuario_logado, 'profile') else 'N/A'
        dados_partida['data'] = date.today()

        serializer = LeaderboardSerializer(data=dados_partida)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)