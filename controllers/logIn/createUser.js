const { where } = require('sequelize');
const {User} = require('../../db/index.js')
const bcrypt = require('bcrypt');

const createUser = async (nickname,password, name) =>{
        //evaluar que no este repetido
        //has password 
        console.log('entre a crear usuario');
        const saltRounds = 10;
        // Hashea la contraseña
        password = await bcrypt.hash(password, saltRounds);


        const [newUser, created ]= await User.findOrCreate({
            where : {nickname},
            defaults : {
                nickname,
                password,
                name
            }
        })
        //hash a contraseña

        
        return created
}


const logIn = async (nickname,password) =>{
        /*
        - buscar info en la base de daots 
        - enviar token 
        - guardar token en cokies
        */

    const result =await User.findOne({where:{
        nickname
    }})

    if (!result.length) throw Error('Usuario no encontrado')
    
    // Compara la contraseña ingresada con la contraseña hasheada
    const esValido = await bcrypt.compare(password, result.password);
       
    console.log(esValido, ' password ddddddddd');
    
    

        

        console.log(result , "resulttado de login");

       

    return {status : true, result}

   

}





module.exports = {
    createUser,
    logIn
}