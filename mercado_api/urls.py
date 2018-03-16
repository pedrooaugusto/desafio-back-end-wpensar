# api/<somehting>

from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from .api_views import CreateAndListProduct, DetailsProduct, CreateAndListCompra, DetailsCompra, UserView, UserDetailsView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = {
	
	#	GET  api/produtos/ -> Listar todos os produtos
	#	POST api/produtos/ -> Cadastrar novo produto
	re_path(r'^api/produtos/$', CreateAndListProduct.as_view(), name = "create_and_list_product"),


	#	GET    api/produtos/1 -> Retorna o produto com id 1
	#	PUT    api/produtos/1 -> Altera o produto com id 1
	#	DELETE api/produtos/1 -> Apaga o produto com id 1
	re_path(r'^api/produtos/(?P<pk>[0-9]+)/$', DetailsProduct.as_view(), name = "details_product"),


	#	GET  api/compras/ -> Listar todos as compras
	#	POST api/compras/ -> Cadastrar nova compra
	re_path(r'^api/compras/$', CreateAndListCompra.as_view(), name = "create_and_list_compra"),


	#	GET    api/compras/1 ->  Retorna a compra com id 1
	#	PUT    api/compras/1 -> Altera a compra com id 1
	#	DELETE api/compras/1 -> Apaga a compra com id 1
	re_path(r'^api/compras/(?P<pk>[0-9]+)/$', DetailsCompra.as_view(), name = "details_compra"),


	#   GET    api/users/    -> Listar todos os usuários
	re_path(r'^api/users/$', UserView.as_view(), name="users"),

    
    #   GET    api/users/1    -> Retorna usuário com id 1
    re_path(r'api/users/(?P<pk>[0-9]+)/$', UserDetailsView.as_view(), name="user_details"),
	

	#   POST   api/get-token/ -> Requere um token de acesso
	re_path(r'^api/get-token/', obtain_auth_token),
}

urlpatterns = format_suffix_patterns(urlpatterns)