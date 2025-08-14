from django.db import models

class Leaderboard(models.Model): 
    id_player = models.IntegerField()
    nickname = models.CharField(max_length=50) 
    pais = models.CharField(max_length=30)
    data = models.DateField()
    tempo = models.IntegerField() 
    nivel_max = models.IntegerField()
    modulos = models.CharField(max_length=100)

    def __str__(self):
        return self.nickname 