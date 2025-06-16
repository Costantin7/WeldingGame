from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Perguntas
from .serializers import PerguntasSerializer

class EscolherPergunta(APIView):
    
    def get(self, request):
        print(request)
        
        idioma = request.GET.get("idioma")
        nivel = request.GET.get("nivel")
        tema1 = request.GET.get("tema1")
        tema2 = request.GET.get("tema2")
        tema3 = request.GET.get("tema3")
        tema4 = request.GET.get("tema4")

        print("idioma:", idioma)
        print("nivel:", nivel)
        print("tema1:", tema1)
        print("tema2:", tema2)
        print("tema3:", tema3)
        print("tema4:", tema4)

        perguntas = Perguntas.objects.all()

        if idioma == "1":
            perguntas = perguntas.filter(idioma="en")
        elif idioma == "0":
            perguntas = perguntas.filter(idioma="pt")

        # Excluir temas, convertendo somente se existir e for número válido
        for tema in [tema1, tema2, tema3, tema4]:
            if tema:
                try:
                    tema_int = int(tema)
                    perguntas = perguntas.exclude(tema=tema_int)
                except ValueError:
                    pass  # Ignora se não for um inteiro válido

        # Filtrar por nível só se nível for válido
        if nivel:
            try:
                nivel_int = int(nivel)
                perguntas = perguntas.filter(nivel=nivel_int)
            except ValueError:
                pass  # Ignora filtro de nível se inválido

        perguntaescolhida = perguntas.order_by('?').first()

        if perguntaescolhida:
            serializer = PerguntasSerializer(perguntaescolhida)
            return Response(serializer.data)
        else:
            return Response({'mensagem': 'nenhuma pergunta encontrada'}, status=404)
