from django.db import models

# for auth
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.dispatch import receiver


class Produto(models.Model):
	""" Campos da tabela produto """
	
	# unique = True, pois o enunciado diz 
	# que produtos de mesmo nome são a mesma entidade
	nome = models.CharField(max_length = 255, blank = False, unique = True)
	
	def __str__(self):
		""" toString() """
		return "{}".format(self.nome)


class Compra(models.Model):
	""" Campos da tabela compra """

	produto = models.ForeignKey(Produto, 
		related_name = 'produtos', 
		on_delete = models.CASCADE
	)
	
	quantidade = models.IntegerField(default = 1) # Como não foi especificado vou assumir que seja int
	preco = models.FloatField(default = 0)
	preco_medio = models.FloatField(default = 0)
	data = models.DateTimeField('data da compra')

	def save(self, *args, **kwargs):
		""" O preco medio não é informado pelo usuário e sim calculado automaticamente """
		
		self.preco_medio = self.preco / self.quantidade
		
		super(Compra, self).save(*args, **kwargs)


"""
	Toda vez que um novo usuário é criado 
	essa função é disparada e cria um token pra ele
"""
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)