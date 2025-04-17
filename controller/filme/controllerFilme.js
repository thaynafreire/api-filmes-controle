/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 11/02/2025
 * autor: thayná
 * versao: 1.0 
 ***************************************************************************************/


//import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')


//import do arquivo para realizar o CRUD de dados no Banco de Dados
const filmeDAO = require('../../model/DAO/filme.js')

//funcao para tratar a insercao de um filme no DAO
const inserirFilme=async function(filme, contentType){
    try {

        if (String(contentType).toLowerCase() == 'application/json'){
            let response={}
            if(filme.nome == ''                 ||filme.nome ==undefined            ||filme.nome==null              ||filme.nome.length>80      ||
                filme.duracao==''               ||filme.duracao==undefined          ||filme.duracao==null           ||filme.duracao.length>5    ||
                filme.sinopse==''               ||filme.sinopse==undefined          ||filme.sinopse==null           ||
                filme.data_lancamento==''       ||filme.data_lancamento==undefined  ||filme.data_lancamento==null   ||filme.data_lancamento>10  ||
                filme.foto_capa==undefined      ||filme.foto_capa>200               ||
                filme.link_trailer==undefined   ||filme.link_trailer>200 
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultFilme = await filmeDAO.insertFilme(filme)
        
                if(resultFilme)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

//funcao para tratar a atualizacao de um filme no DAO
const atualizarFilme=async function(id, filme, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            let response={}
            if(id          == ''                || id         == undefined          || id        == null            || isNaN(id)                || id <= 0 ||
                filme.nome == ''                 ||filme.nome ==undefined            ||filme.nome==null              ||filme.nome.length>80      ||
                filme.duracao==''               ||filme.duracao==undefined          ||filme.duracao==null           ||filme.duracao.length>5    ||
                filme.sinopse==''               ||filme.sinopse==undefined          ||filme.sinopse==null           ||
                filme.data_lancamento==''       ||filme.data_lancamento==undefined  ||filme.data_lancamento==null   ||filme.data_lancamento>10  ||
                filme.foto_capa==undefined      ||filme.foto_capa>200               ||
                filme.link_trailer==undefined   ||filme.link_trailer>200 
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //validação para verificar se o id existe
                let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

                if(resultFilme != false || typeof(resultFilme) == 'object'){
                    if(resultFilme.length > 0){
                        //update
                        //adiciona o id do filme no json com os dados
                        filme.id = parseInt(id)

                        let result = await filmeDAO.updateFilme(filme)

                        if (result){
                            return message.SUCCESS_UPDATED_ITEM //200
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500
                        }
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }

            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//funcao para tratar a exclusao de um filme no DAO
const excluirFilme=async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            //função que verifica se id existe no bd
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

            if(resultFilme != false || typeof(resultFilme) == 'object'){
                //se existir faremos o delete
                if(resultFilme.length > 0){
                    //delete
                    let result = await filmeDAO.deleteFilme(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                }else{
                    return message.ERROR_NOT_FOUND // 404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


//funcao para tratar o retorno de uma lista de filmes do DAO
const listarFilme=async function(){
    try{

        //objeto do tipo json
        let dadosFilme = {}

        //chama a função para retornar os filmes cadastrados
        let resultFilme = await filmeDAO.selectAllFilme()

        if(resultFilme != false){
            if(resultFilme.length > 0){

                //criando um json de retorno de dados para a api 
                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.itens = resultFilme.length
                dadosFilme.films = resultFilme

                return dadosFilme

            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        } 

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500

    }
}

//funcao para tratar o retorno de um filme filtrado pelo id do DAO
const buscarFilme=async function(id){
    try {
        if (id == '' || id == undefined || id == null|| isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        }else{
            dadosFilme

            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))
            console.log(resultFilme)

            if(resultFilme != false || typeof(resultFilme) == 'object'){
                if(resultFilme.length > 0){
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.films = resultFilme

                }

            }
        }

    } catch (error) {

    }
}

module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}