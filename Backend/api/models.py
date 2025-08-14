from django.db import models
from django.contrib.auth.models import User

# Este modelo armazena as informações adicionais do usuário.
# Ele tem uma relação de um-para-um com o modelo User padrão do Django.
class Profile(models.Model):
    # O 'user' é a chave que conecta o Perfil ao Usuário.
    # on_delete=models.CASCADE significa que se um usuário for deletado, seu perfil também será.
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Campos baseados no seu formulário React.
    # blank=True e null=True tornam os campos opcionais no banco de dados.
    instituicao = models.CharField(max_length=100, blank=True, null=True)
    pais = models.CharField(max_length=50, blank=True, null=True)
    profissao = models.CharField(max_length=100, blank=True, null=True)
    escolaridade = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        # Retorna o nome de usuário para uma representação amigável no admin do Django.
        return self.user.username
