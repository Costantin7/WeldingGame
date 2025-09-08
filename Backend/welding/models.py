from django.db import models

class Perguntas(models.Model):
    modulo=models.CharField(max_length=30)
    nivel=models.IntegerField()
    numero=models.IntegerField()
    pergunta = models.TextField()

    resposta_0 = models.TextField()
    resposta_1 = models.TextField()
    resposta_2 = models.TextField()
    resposta_3 = models.TextField()

    gabarito = models.IntegerField()
    tema = models.IntegerField()
    idioma = models.CharField(max_length=5)
    ilustracao = models.CharField(max_length=256, blank=True, null=True)
    explanation = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.pergunta[:50]}"
# Create your models here.
