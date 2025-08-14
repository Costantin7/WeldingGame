# api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    """Serializer para o modelo de Perfil."""
    class Meta:
        model = Profile
        fields = ['instituicao', 'pais', 'profissao', 'escolaridade']

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer principal para o registro de novos usuários.
    Ele lida com os dados do User e do Profile aninhado.
    """
    # Incluímos o serializer do perfil aqui para lidar com os campos extras.
    profile = ProfileSerializer(required=True)
    
    # O campo 'nome' do seu formulário será dividido em first_name e last_name.
    nome = serializers.CharField(write_only=True, required=True)
    
    # Campo para confirmar a senha. 'write_only' significa que não será enviado de volta na resposta.
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        # Campos que o serializer espera receber do frontend.
        # 'apelido' do React será mapeado para 'username' do Django.
        fields = ['username', 'email', 'password', 'password2', 'nome', 'profile']
        extra_kwargs = {
            'password': {'write_only': True} # Garante que a senha não seja lida.
        }

    def validate(self, data):
        """
        Validação customizada para checar se as senhas coincidem.
        """
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})
        return data

    def create(self, validated_data):
        """
        Cria o objeto User e o Profile associado.
        Este método é chamado após a validação ser bem-sucedida.
        """
        # Separa os dados do perfil dos dados do usuário.
        profile_data = validated_data.pop('profile')
        
        # Remove os campos que não pertencem ao modelo User padrão.
        validated_data.pop('password2')
        nome_completo = validated_data.pop('nome')
        
        # Divide o nome completo em primeiro e último nome.
        # Se não houver espaço, o nome inteiro vai para first_name.
        parts = nome_completo.split(' ', 1)
        first_name = parts[0]
        last_name = parts[1] if len(parts) > 1 else ''

        # Cria o usuário usando o método create_user para garantir que a senha seja hasheada.
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            **validated_data
        )
        
        # Cria o perfil associado ao usuário recém-criado.
        Profile.objects.create(user=user, **profile_data)
        
        return user
