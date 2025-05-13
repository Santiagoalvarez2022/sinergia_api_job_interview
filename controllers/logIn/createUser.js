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
    try {
        let {nickname, password, email, name, lastname} = req.body
        if (!nickname || !password || !email || !name || !lastname) throw Error('Incomplete data to create users');
        if (!isValidEmail(email)) throw Error('Email no valido.');
        // Busca si el email o nombre de uuario existe
        const findNickName = await User.findOne({where:{nickname}});
        if (findNickName) throw Error('Este nombre de usuario ya existe'); 
        const findEmail = await User.findOne({where:{email}});
        if (findEmail) throw Error(`El email '${email}' ya está registrado en una cuenta. `);

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



module.exports = {
    createUser,
};
