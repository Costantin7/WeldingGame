from rest_framework import serializers
from .models import Perguntas

class PerguntasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perguntas
        fields = '__all__'  # Ou liste os campos que quer retornar, ex: ['id', 'texto', 'nivel']
