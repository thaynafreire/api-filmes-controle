
const {PrismaClient}=require('@prisma/client')

const prisma=new PrismaClient()


//funcao para inserir um novo usuario
const insertUser= async function (user) {

    try {

        let sql = `insert into tbl_usuario (nome,
                                            email,
                                            username,
                                            data_nascimento,
                                            senha
                                            )
                                            values
                                            (
                                            '${user.nome}',
                                            '${user.email}',
                                            '${user.username}',
                                            '${user.data_nascimento}',
                                            '${user.senha}'
                                            )`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
        
    } catch (error) {
        return false
    }
    
}

//funcao para atualizar um usuario

const updateUser = async function (user) {

    try {
        let sql = `update tbl_usuario set nome =            '${user.nome}',
                                          email =           '${user.email}',
                                          username =        '${user.username}',
                                          data_nascimento = '${user.data_nascimento}',
                                          senha =           '${user.senha}'
                                          `
        let resultUser = await prisma.$executeRawUnsafe(sql)

        if(resultUser){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
    
}

//funcao para excluir um filme existente

const deleteUser = async function (id) {

    try {
        let sql = `delete from tbl_usuario where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql) 

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false     
    }
    
}

//funcao para retornar todos os usuarios existentes
const selectAllUser = async function () {
    
    
}
