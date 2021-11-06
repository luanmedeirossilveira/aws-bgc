# Desafio AWS BGC

## Descrição
  Projetar uma API através de um modelo de execução __Serverless__ com apoio de tecnologias Amazon AWS, onde esta API forneça
  um payload de 3 produtos principais, com o conceito de __Web Scrapper__, do E-commerce escolhido da __Aduana__.

## Necessário para realizar o desafio
  - Login amazon AWS

## Tecnologias
  Este projeto foi desenvolvido com as seguintes tecnlogias:
  - Serverless Framework
    - Framework para melhor manipulação do modelo de execução SERVERLESS
  - ExpressJS
    - Framework nodejs
  - "serverless-http"
    - Lib utilizável para conexão do Express com Serverless Framework
  - "serverless-dynamodb-local"
  - "serverless-offline"
  - AWS Lambda
  - AWS API Gateway
  - AWS DynamoDB
  - Puppeteer / "puppeteer-core" / "chrome-aws-lambda"
    - Utilizado as 3 bibliotecas que servem como processos automátizados para entrar em sites
      e no projeto para fazer o web scrapper
  - Prettier
    - Organização do código JS

## Comandos para executar LOCAL
  - Para iniciar o servidor
  ```
    $ serverless offline start --stage local
  ```

  - Para fazer o login AWS no Serverless Framework
  ```
    $ serverless config credentials -o --provider aws --key=KEY_ACCESS --secret KEY_SECRET
  ```

  - Para iniciar o servidor DynamoDB
  ```
    $ serverless dynamodb start
  ```

## Necessário para DEPLOY

  - Para fazer o login AWS no Serverless Framework
  ```
    $ serverless config credentials -o --provider aws --key=KEY_ACCESS --secret KEY_SECRET
  ```

  - serverless deploy --verbose

## Árvore dos diretórios

  ```
    project
    │   README.md
    │   .gitignore
    |   .prettierrc.json
    |   handler.js    
    |   package-lock.json
    |   package.json
    │   serverless.yml
    |
    └───src
        └───controllers
        |   │   products.js
        └───middleware
        |   │   index.js
        └───router
        |   │   products.js
        └───service
        |   |   products.js
  ```

## Rotas API
  - Para salvar e listar 3 produtos da página
    - /api/products (GET)
    ```
      // Resposta
      {
        "productId": String,
        "title": String,
        "src": String,
        "oldValue": Number,
        "newValue": Number
      }
    ```
  - Para fazer a busca dos produtos
    - /api/products (GET)
    ```
      // Resposta
      {
        "productId": String,
        "title": String,
        "src": String,
        "oldValue": Number,
        "newValue": Number
      }
    ```

## Bibliografia
  - https://www.serverless.com/framework/docs (Para conexão dos serviços AWS ao Serverless Framework)
  - https://docs.aws.amazon.com/pt_br/index.html?nc2=h_ql_doc  (Todos os serviços AWS)
  - 