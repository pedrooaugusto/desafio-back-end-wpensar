# **Tecnologias usadas** #
* Backend:
    * Python 3.4+
    * Django Framework 
    * Django Rest Framework
    * cors headers
* Front End:
  * React
  * Material UI
  * react router

Todos são open source.

# **Requisitos atendidos** #
1. Cadastro de produtos (Nome) - (:heavy_check_mark:)
2. Compra de produtos (Produto, quantidade e preço de compra) - (:heavy_check_mark:)
3. Listagem dos produtos comprados separados por compra (Nome, quantidade, preço de compra, preço médio) - (:heavy_check_mark:)
4. Ser fácil de configurar e rodar em ambiente Unix (Linux ou Mac OS X) - (:heavy_check_mark:) (subiu pro heroku...)
5. Ser WEB - (:heavy_check_mark:)
6. Ser escrita em Python 3.4+ - (:heavy_check_mark:)
7. Só deve utilizar biliotecas livres e gratuitas - (:heavy_check_mark:)

8. Autenticação e autorização (se for com OAuth, melhor ainda) - (:heavy_check_mark:)
9. Ter um design bonito - (:heavy_check_mark:)
10. Testes automatizados - (:heavy_check_mark:)
11. Angular / Ionic / React / ReactNative - (:heavy_check_mark:) (React)


# **Como rodar** #
Usuário: admin

Senha: 0000aaaa

Live da aplicação rodando em: https://wpensar-desafio.herokuapp.com

DEBUG = true, garantindo, assim, acesso a /admin


Para rodar a aplicação na sua máquina primeiro crie 
um ambiente virtual chamado venv no diretório do projeto (ou não):
```
python -m venv venv
```
Em seguida ative-o:
````
venv\Scripts\activate (Windows), (Mac) source venv/bin/activate
````
(leia mais em: https://docs.python.org/3/tutorial/venv.html)

Agora instale as dependências do projeto com pip:
````
pip install -r requirements.txt
````

Por fim, para iniciar o servidor:
````
python manage.py runserver
````

# **Testes** #

```
python manage.py test
```
Como o desafio é sobre backend não achei necessário escrever testes para frontend.

Os testes consistem em checar se a api é capaz de realizar as 4 operações de CRUD.


# **Porque trabalhar no Grupo WP?** #

* Porque quero trabalhar num ambiente MERITOCRÁTICO. Aqui os melhores são reconhecidos sempre!

* Porque quero aprender coisas novas a cada minuto.

* Porque quero ajudar a construir a maior empresa de tecnologia para educação do Brasil.

* Porque tenho sede por novos desafios.

* Porque quero fazer diferença!

# **Como faço para me candidatar?** #

1. Faça um fork do repositório
2. Desenvolva o desafio de acordo com o proposto abaixo
3. Mande um pull request com o curriculo e a resposta do desafio

## ** Caso você não deseje que o envio seja público ** ##

1. Faça um clone do repositório
2. Desenvolva o desafio de acordo com o proposto abaixo
3. Envie um email com o curriculo e um arquivo patch para rh@wpensar.com.br

# **Desafio Backend:** #

O conceito desse desafio é nos ajudar a avaliar as habilidades dos candidatos às vagas de backend.

Você tem que desenvolver um sistema de estoque para um supermercado.

Esse supermercado assume que sempre que ele compra uma nova leva de produtos, ele tem que calcular o preço médio de compra de cada produto para estipular um preço de venda.
Para fins de simplificação assuma que produtos que tenham nomes iguais, são o mesmo produto e que não existe nem retirada e nem venda de produtos no sistema.

O valor calculado de preço médio deve ser armazenado.

Seu sistema deve:

1. Cadastro de produtos (Nome)
2. Compra de produtos (Produto, quantidade e preço de compra)
3. Listagem dos produtos comprados separados por compra (Nome, quantidade, preço de compra, preço médio)
4. Ser fácil de configurar e rodar em ambiente Unix (Linux ou Mac OS X)
5. Ser WEB
6. Ser escrita em Python 3.4+
7. Só deve utilizar biliotecas livres e gratuitas

Esse sistema não precisa ter, mas será um plus:

1. Autenticação e autorização (se for com OAuth, melhor ainda)
2. Ter um design bonito
3. Testes automatizados


# **Desafio Frontend:** #

O conceito desse desafio é nos ajudar a avaliar as habilidades dos candidatos às vagas de frontend.

Você tem que desenvolver um sistema de estoque para um supermercado.

A api mockada a ser utilizada fica em http://docs.querotrabalharnawpensar.apiary.io

Seu sistema deve:

1. Cadastro de produtos (Nome)
2. Compra de produtos (Produto, quantidade e preço)
3. Listagem dos produtos comprados separados por compra (Nome, quantidade, preço de compra)
4. Ser fácil de configurar e rodar em ambiente Unix (Linux ou Mac OS X)
5. Só deve utilizar biliotecas livres e gratuitas

Esse sistema não precisa ter, mas será um plus:

1. Autenticação e autorização (Facebook, Google, Twitter)
2. Ter um design bonito e responsivo
3. Testes automatizados
4. Angular / Ionic / React / ReactNative


# **Avaliação:** #

Vamos avaliar seguindo os seguintes critérios:

1. Você conseguiu concluir os requisitos?
2. Você documentou a maneira de configurar o ambiente e rodar sua aplicação?

# **Condições e Beneficios Oferecidos:** #

* Local: No meio de Icarai, Niterói - RJ
* Regime CLT
* Período Integral
* Horário Flexível
* Vale Refeição
* Vale Transporte
* Ambiente descontraído
* Grande possibilidade de crescimento
* Trabalhar com projetos que mudam a Educação no País
* Café liberado
* Frutas liberadas
* Sinuca
* Cerveja
* PS3
* Tv a Cabo
