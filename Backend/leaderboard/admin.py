# leaderboard/admin.py

from django.contrib import admin
from .models import Leaderboard

# Esta linha regista o seu modelo Leaderboard na interface de administração
admin.site.register(Leaderboard)