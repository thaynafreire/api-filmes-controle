/***************************************************************
 * objetivo: criar uma API para realizar o CRUD do sistema de controle de filmes
 * data: 11/02/2025
 * autor: Thayná
 * versao: 1.0
 * observacao:
 *      para criar a API precisamos instalar:
 *          express         npm install express --save
 *          cors            npm install cors --save
 *          body-parser     npm install body-parser --save
 * 
 *      para criar a integracao com o banco de dados precisamos instalar:
 *          prisma          npm install prisma --save (para fazer a conexao com o banco de dados)
 *          prisma/client   npm install @prisma/client --save (para rodar os scripts SQL)
 * 
 *      após a instalação do prisma e do prisma client devemos:
 *          npx prisma init
 *      você deverá cofigurar o arqivo .env e o schema.prisma com as credenciais do banco de dados
 *      apos essa configuraçao devera rodar o seguinte comando:
 *          npx prisma migrate dev
**********************************************************************************/

//import das bibliotecas para configrar a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//manipular o body da reqisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()

//cria objeto app com referencias do express para criar a api
const app = express()


//configurações de acesso doo CORS para a api
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

const controllerFilme = require('./controller/filme/controllerFilme.js')

app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function(request, response){


    //Recebe o content type da requisição
    let contentType = request.header('content-type')

    //recebe do body da requisiçao os dados encaminhados
    let dadosBody = request.body
    let resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme', cors(), async function (request, response){

    //chama a função para retornar os filmes 
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
    
})

app.get('/v1/controle-filmes/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id

    let resultFilme = await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.delete('/v1/controle-filmes/filme/:id', cors(), async function (request, response) {
    //recebe id da requisição
    let idFilme = request.params.id
    let resultFilme = await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)  
    response.json(resultFilme)
    
})

app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idFilme = request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)


})


app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições')
})

