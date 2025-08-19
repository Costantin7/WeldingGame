from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Perguntas
from .serializers import PerguntasSerializer
from django.db.models import Q # Import Q para filtros complexos se necessário no futuro

class EscolherPergunta(APIView):
    
    def get(self, request):
        # Parâmetros que continuam funcionando normalmente
        idioma = request.GET.get("idioma")
        nivel = request.GET.get("nivel")
        
        # LÓGICA CORRIGIDA ABAIXO =======================================================
        # 1. Recebemos o novo parâmetro 'temas'
        temas_selecionados = request.GET.get("temas")
        
        print("Backend recebeu - Idioma:", idioma, "Nível:", nivel, "Temas:", temas_selecionados)

        # Começamos com todas as perguntas
        perguntas = Perguntas.objects.all()

        # Filtro de idioma (continua igual)
        if idioma == "1":
            perguntas = perguntas.filter(idioma="en")
        elif idioma == "0":
            perguntas = perguntas.filter(idioma="pt")

        # 2. Filtro de temas (lógica nova e simplificada)
        if temas_selecionados:
            # Convertendo a string "1,2,4" para uma lista de inteiros [1, 2, 4]
            temas_ids = [int(id) for id in temas_selecionados.split(',') if id.isdigit()]
            
            # Se a lista de IDs não estiver vazia após a conversão
            if temas_ids:
                # Usamos o filtro '__in' para buscar perguntas cujo 'tema' esteja na lista de IDs
                perguntas = perguntas.filter(tema__in=temas_ids)
        else:
            # Se nenhum tema for enviado, não retornamos nenhuma pergunta
            # Isso evita que o jogo comece sem módulos selecionados
            return Response({'mensagem': 'Nenhum módulo selecionado'}, status=400)

        # FIM DA LÓGICA CORRIGIDA =======================================================

        # Filtro de nível (continua igual)
        if nivel:
            try:
                nivel_int = int(nivel)
                perguntas = perguntas.filter(nivel=nivel_int)
            except ValueError:
                pass  # Ignora filtro de nível se inválido

        # Escolhe uma pergunta aleatória do conjunto filtrado
        perguntaescolhida = perguntas.order_by('?').first()

        if perguntaescolhida:
            serializer = PerguntasSerializer(perguntaescolhida)
            return Response(serializer.data)
        else:
            # Mensagem de erro caso nenhum resultado seja encontrado com os filtros aplicados
            return Response({'mensagem': 'Nenhuma pergunta encontrada com os filtros especificados'}, status=404)
