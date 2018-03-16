from rest_framework import generics, permissions
from .serializers import ProdutoSerializer, CompraSerializer, UserSerializer
from .models import Produto, Compra

#for auth
from django.contrib.auth.models import User

class CreateAndListProduct(generics.ListCreateAPIView):
	""" Criar e listar produtos """
	
	queryset = Produto.objects.all()
	
	serializer_class = ProdutoSerializer
	
	#permission_classes = ()
	#permission_class = permissions.IsAuthenticated	
	
	def perform_create(self, serializer):
		serializer.save()


class DetailsProduct(generics.RetrieveUpdateDestroyAPIView):
	""" 
		GET    / Retorna o produto com o id especificado
		PUT    / Altera o produto com o id especificado
		DELETE / Apaga o produto com o id especificado
	"""

	queryset = Produto.objects.all()
	
	serializer_class = ProdutoSerializer
	#permission_class = permissions.IsAuthenticated


class CreateAndListCompra(generics.ListCreateAPIView):
	""" Criar e listar compras """
	
	queryset = Compra.objects.all()
	
	serializer_class = CompraSerializer
	#permission_classes = ()
	#permission_class = permissions.IsAuthenticated	
	
	def perform_create(self, serializer):
		serializer.save()


class DetailsCompra(generics.RetrieveUpdateDestroyAPIView):
	""" 
		GET    / Retorna a compra com o id especificado
		PUT    / Altera a compra com o id especificado
		DELETE / Apaga a compra com o id especificado
	"""

	queryset = Compra.objects.all()
	
	serializer_class = CompraSerializer
	#permission_class = permissions.IsAuthenticated


class UserView(generics.ListAPIView):
	""" GET / Retorna uma lista dos usuários """
	
	queryset = User.objects.all()
	serializer_class = UserSerializer

	permission_classes = ()

class UserDetailsView(generics.RetrieveAPIView):
	""" GET / Retorna um usuario """
	
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = ()


# class FrontEnd(generics.View):
# 	""" Retorna o HTML/Front end feito em react  """
	
# 	def get(self, request):
# 		try:
# 			with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
# 				return Http
# 		except Exception as e:
# 			raise e