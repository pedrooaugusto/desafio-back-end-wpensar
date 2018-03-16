""" 
	Os testes estão dividios em duas grandes categorias:
	testes da Model e testes da View.

	Os testes da Model tentam fazer as operaçõeas básicas
	de CREATE, READ, UPDATE, DELETE, uzando apenas o Model.

	Os testes da View tentam fazer as operações do protocolo
	htttp GET, POST, PUT, DELETE utilizando os endpoinas da view,
	que por sua vez usa o Model
"""

from django.test import TestCase
from .models import Produto, Compra
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse

#for auth
from django.contrib.auth.models import User

from django.utils import timezone as datetime
import pytz


class ModelTestCaseProduto(TestCase):
	""" Testes para a classe modelo Produto  """

	def setUp(self):
		""" Incializando variáveis para os testes. """

		self.produto = Produto(nome = 'Biscoito - Trakinas')

	
	def teste_modelo_consegue_criar_um_produto(self):
		""" 
			Testa se o modelo é capaz de criar (salvar) um produto,
			comparando o total de produtos cadastrados de antes e 
			depois de salvar.
		"""

		old_total = Produto.objects.count()
		
		self.produto.save()
		
		new_total = Produto.objects.count()
		
		self.assertNotEqual(old_total, new_total)


class ViewTestCaseProduro(TestCase):
	""" Teste para as views/api Produto"""

	def setUp(self):
		""" Inicializando variáveis para os testes """
		
		# cria um usuário de testes
		user = User.objects.create(username = "tester")
		
		self.client = APIClient()

		# autentifica o usuário de testes
		self.client.force_authenticate(user=user)
		
		self.produto_data = {'nome': 'Coca Cola 2L'}
		
		self.response = self.client.post(
			reverse('create_and_list_product'),
			self.produto_data,
			format = "json"
		)

		
	def teste_api_consegue_criar_um_produto(self):
		""" Testa se a api/view consegue criar um produto """
		
		self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)


	def teste_api_consegue_retornar_um_produto(self):
		"""  Testa se a api/view consegue retornar um produto """
		
		produto = Produto.objects.get()
		
		response = self.client.get(
			reverse('details_product', kwargs = {'pk': produto.id}),
			format = "json"
		)
		
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertContains(response, produto)


	def teste_api_consegue_alterar_um_produto(self):
		""" Testa se a api/view consegue alterar um produto """
		
		produto = Produto.objects.get()
		
		produto_alterado = {'nome': 'Fanta Laranja 2L'}
		
		response = self.client.put(
			reverse('details_product', kwargs = {'pk': produto.id}),
			produto_alterado,
			format = 'json'
		)
		
		self.assertEqual(response.status_code, status.HTTP_200_OK)


	def teste_api_consegue_deletar_um_produto(self):
		""" Testa se a api consegue deletar um produto """
		
		produto = Produto.objects.get()
		
		response = self.client.delete(
			reverse('details_product', kwargs = {'pk': produto.id}),
			format = 'json',
			follow = True
		)
		
		self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


class ModelTestCaseCompra(TestCase):
	""" Testes para a classe modelo Compra """
	
	def setUp(self):
		""" Inicializando variáveis para os testes """
		
		self.compra_data = {
			'produto_name': 'Biscoito - Trakinas - Morango',
			'quantidade': 5,
			'preco': 500,
			'data': datetime.now()
		}
		
		self.produto = Produto(nome = self.compra_data['produto_name'])
		self.produto.save()
		
		self.compra = Compra(produto = self.produto, 
			quantidade = self.compra_data['quantidade'], 
			preco = self.compra_data['preco'], 
			data = self.compra_data['data']
		)

		
	def teste_modelo_consegue_criar_uma_compra(self):
		""" Testa se o model consegue criar uma compra """
		
		old_total = Compra.objects.count()
		
		self.compra.save()
		
		new_total = Compra.objects.count()
		
		self.assertNotEqual(old_total, new_total)

	
	def teste_modelo_consegue_calcular_preco_medio_da_compra(self):
		""" Testa se o model consegue calcular o preco medio """
		
		self.compra.save()
		
		compra = Compra.objects.get()
		
		self.assertEqual(compra.preco_medio, 
			self.compra_data['preco'] / self.compra_data['quantidade'])


class ViewTestCaseCompra(TestCase):
	""" Testes para a classe view/api Compra """
	
	def setUp(self):
		""" Inicializando variáveis para os testes """
		
		# cria um usuário de testes
		user = User.objects.create(username = "tester")
		
		self.client = APIClient()

		# autentifica o usuário de testes
		self.client.force_authenticate(user = user)
		
		self.produto = Produto(nome = 'Coca Cola 2L')
		self.produto.save()
		
		self.compra_data = {
			'produto': self.produto.id, 
			'quantidade': 5, 
			'preco': 575, 
			'data': datetime.now()
		}

		self.response = self.client.post(
			reverse('create_and_list_compra'),
			self.compra_data,
			format = "json"
		)


	def teste_api_consegue_criar_uma_compra(self):
		""" Testa se a api/view consegue criar uma compra """
		
		self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)


	def teste_api_consegue_retornar_uma_compra(self):
		"""  Testa se a api/view consegue retornar uma compra """
		
		compra = Compra.objects.get()
		
		response = self.client.get(
			reverse('details_compra', kwargs = {'pk': compra.id}),
			format = "json"
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data['id'], compra.id)


	def teste_api_consegue_alterar_uma_compra(self):
		""" Testa se a api/view consegue alterar uma compra """
		
		compra = Compra.objects.get()
		
		self.compra_data['quantidade'] = 15
		
		response = self.client.put(
			reverse('details_compra', kwargs = {'pk': compra.id}),
			self.compra_data,
			format = 'json'
		)
		
		self.assertEqual(response.status_code, status.HTTP_200_OK)


	def teste_api_consegue_deletar_uma_compra(self):
		""" Testa se a api consegue deletar uma compra """
		
		compra = Compra.objects.get()
		
		response = self.client.delete(
			reverse('details_compra', kwargs = {'pk': compra.id}),
			format = 'json',
			follow = True
		)
		
		self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
