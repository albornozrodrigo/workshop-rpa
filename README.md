## README

## Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Versão mais recente do `NODE.js`

## Rodando o projeto

Para rodar, clone o projeto, entre na pasta e instale as dependências através do terminal com o comando abaixo:

```
npm i
```

Para executar o projeto, basta utilizar o comando abaixo no terminal:

```
npm start
```

## Passo a passo da aplicação

1 - Instancia o puppeteer
2 - Abre a página solicitada via browser
3 - Identifica na página o elemento a ser extraído
4 - Armazena os dados do elemento em uma variável
5 - Fecha o browser
6 - Percorre os dados obtidos, reorganiza e armazena em uma variável nova
7 - Escreve os dados em um arquivo CSV
