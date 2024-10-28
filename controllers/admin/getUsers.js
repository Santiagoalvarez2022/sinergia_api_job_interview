/*

pasos para crear un controller :

A - busco la tabla o modelo donde estan los usuario (SI NO LA SE BUSCO EN /db/index.js)

*/


//A, Obtuve la tabla donde estan mis usuarios

const {User} = require('../../db/index.js')

//DECLARO UNA FUNCION
const getUsers = async () =>{
    try {
        //usrs tenfra todas las entradas o registros de usuarios de mi base de datos 
        /**
         * declaro una variable
         * ejecuto con un await un metodo del model de sequelize
         * findAll = select * from users; 
         */
        const users = await User.findAll();

        //yo tengo un array con todos mis usuarios, quiero solo enviar el nombre, apellido, id, foto 

    

        console.log('users, ./getusers ', users);


        return users;

    } catch (error) {
        throw Error('Error in getUsers  of admin')
    }
}

//EJECUTO UNA FUNCION
// getUsers()

module.exports = {
   getUsers,
 
}