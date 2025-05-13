const { User,EmailVerification } = require('../../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const logIn = async(req,res) =>{
    try {
        //obtengo los paramentros necesario para el login
        const {nickname,password} = req.body;
        
        if(!nickname || !password) throw Error('Debes completar todos los campos.');

        //busco el usuario en la base de datos
        const findUser = await User.findOne({
            where : {nickname}
        })

        //Manejo de error si las credenciales no son correctas
        if (!findUser) throw Error('Usuario no encontrado.');

        //Comparo si la contraseña es correcta
        if(!await bcrypt.compare(password, findUser.password)) throw Error('Credenciales incorrectas.');

        //Valido si el usuario tiene la cuenta activa
        if (findUser.status !== 'active') throw Error('La cuenta aún no se ha verificado.')
        
        const token = jwt.sign(
            {id : findUser.id, name : findUser.name},
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        )
        res.status(200).json({ message: 'Login exitoso', token });

    } catch (error) {
        res.status(400).json({error:error.message} )
    }
}
module.exports = logIn;
