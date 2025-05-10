const { User,EmailVerification } = require('../../db/index.js');
const bcrypt = require('bcrypt');
const emailService = require('../../services/nodemailer/nodemailer.js')
const jwt_emails = require('../../utils/jwt_emails/jwt_verification_user.js')
const isValidEmail = (email) => {
    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    return regex.test(email);
};

// Función para crear un nuevo usuario
const createUser = async (req,res) => {
    console.log('CREAR USUARIO');
    try {
        let {nickname, password, email, name, lastname} = req.body
        if (!nickname || !password || !email || !name || !lastname) throw Error('Incomplete data to create users');
        if (!isValidEmail(email)) throw Error('Email is not valid');
        // Busca si el email o nombre de uuario existe
        const findNickName = await User.findOne({where:{nickname}});
        if (findNickName) throw Error('Nickname already exists'); 
        const findEmail = await User.findOne({where:{email}});
        if (findEmail) throw Error('Email already exists');

        // Define el número de rondas para generar la sal en el hash
        const saltRounds = 10;
        
        // Hashea la contraseña con bcrypt
        password = await bcrypt.hash(password, saltRounds);
        
        //creo el usaurio pero por default status = inactive 
        const newUser = await User.create({nickname, password, email, name, lastname})

       

        //genero token para validarEmail
        const token = jwt_emails.createToken({name,email,nickname})
        const newVerification = await newUser.createEmailVerification({token})

        //envio de mail para verificación 
        await emailService.sendWelcomeEmail(email, name, token)
        //envio mail para verificar usuario
        res.status(200).json({result : newUser,newVerification})

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
};












// Función para iniciar sesión
const logIn = async (nickname, password) => {
    /*
    - Busca un usuario en la base de datos por su nickname
    - Verifica si la contraseña es correcta
    - Devuelve los datos del usuario si es válido
    */

    const result = await User.findOne({
        where: {
            nickname
        }
    });

    // Si no se encuentra el usuario, lanza un error
    if (!result.length) throw Error('Usuario no encontrado');

    // Compara la contraseña ingresada con la contraseña hasheada almacenada
    const esValido = await bcrypt.compare(password, result.password);

    // Si la contraseña no es válida, lanza un error
    if (!esValido) {
        throw Error('incorrect password');
    }

    // Devuelve el estado y la información del usuario
    return { status: true, result };
};

module.exports = {
    createUser,
    logIn
};
