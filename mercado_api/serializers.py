from rest_framework import serializers
from .models import Produto, Compra

#for auth
from django.contrib.auth.models import User

class ProdutoSerializer(serializers.ModelSerializer):
	""" Mapeia os campos do modelo para um formato json """
	
	class Meta:
		model = Produto
		fields = ('id', 'nome')


class CompraSerializer(serializers.ModelSerializer):
	""" Mapeia os campos do modelo para um formato json """
	
	preco_medio = serializers.ReadOnlyField()
	
	class Meta:
		model = Compra
		fields = ('id', 'produto', 'quantidade', 'preco', 'preco_medio', 'data')


class UserSerializer(serializers.ModelSerializer):
	""" Mapeia os campos do usuário para autenticar e autorizar """

	class Meta:
		"""Map this serializer to the default django user model."""
		model = User
		fields = ('id', 'username', 'password')
		extra_kwargs = {'password': {'write_only': True}}