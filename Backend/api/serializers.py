# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Q

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
    profile = ProfileSerializer(required=True)
    nome = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'nome', 'profile']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})
        return data

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        validated_data.pop('password2')
        nome_completo = validated_data.pop('nome')
        parts = nome_completo.split(' ', 1)
        first_name = parts[0]
        last_name = parts[1] if len(parts) > 1 else ''
        
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            **validated_data
        )
        
        Profile.objects.create(user=user, **profile_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer para retornar os dados do usuário."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer customizado para o token, permitindo login com username ou email.
    """
    def validate(self, attrs):
        user_identifier = attrs.get('username')
        password = attrs.get('password')

        # Procura o usuário pelo username OU pelo email
        user = User.objects.filter(
            Q(username__iexact=user_identifier) | Q(email__iexact=user_identifier)
        ).first()

        if user and user.check_password(password):
            # Se o usuário for válido, o processo de geração de token continua
            attrs['username'] = user.username
            data = super().validate(attrs)
            return data
        
        # Se não for válido, levanta um erro
        raise serializers.ValidationError('Usuário ou senha inválidos. Tente novamente.')