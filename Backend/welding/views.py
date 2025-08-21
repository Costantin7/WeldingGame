# welding/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Perguntas
from .serializers import PerguntasSerializer

class EscolherPergunta(APIView):
    
    def get(self, request):
        idioma = request.GET.get("idioma")
        temas_selecionados = request.GET.get("temas")
        
        print("Backend a montar jogo com - Idioma:", idioma, "Temas:", temas_selecionados)

        if not temas_selecionados:
            return Response({'mensagem': 'Nenhum módulo selecionado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            temas_ids = [int(id) for id in temas_selecionados.split(',') if id.isdigit()]
        except (ValueError, TypeError):
            return Response({'mensagem': 'Parâmetro de temas inválido'}, status=status.HTTP_400_BAD_REQUEST)

        # Filtro base para as perguntas
        base_query = Perguntas.objects.filter(tema__in=temas_ids)
        if idioma == "1":
            base_query = base_query.filter(idioma="en")
        elif idioma == "0":
            base_query = base_query.filter(idioma="pt")

        perguntas_do_jogo = []
        # Itera de 1 a 20 para buscar uma pergunta para cada nível
        for nivel_atual in range(1, 21):
            # Para cada nível, busca uma pergunta aleatória que corresponda aos filtros
            pergunta_nivel = base_query.filter(nivel=nivel_atual).order_by('?').first()
            
            # Se não encontrar uma pergunta para qualquer um dos níveis, o jogo não pode ser montado
            if not pergunta_nivel:
                mensagem_erro = f"Não foi possível encontrar uma pergunta para o nível {nivel_atual} com os módulos selecionados."
                print(mensagem_erro)
                return Response({'mensagem': mensagem_erro}, status=status.HTTP_404_NOT_FOUND)
            
            perguntas_do_jogo.append(pergunta_nivel)

        # Se encontrou todas as 20 perguntas, serializa a lista e envia para o frontend
        serializer = PerguntasSerializer(perguntas_do_jogo, many=True)
        return Response(serializer.data)
