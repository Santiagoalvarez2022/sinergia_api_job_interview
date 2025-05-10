const { User,EmailVerification } = require('../../db/index.js');
const emailService = require('../../services/nodemailer/nodemailer.js')
const jwt_emails = require('../../utils/jwt_emails/jwt_verification_user.js')

const validateUser = async(req,res) =>{
    console.log('entre a validar el user');
    try {
        const {token} = req.body
        if(!token) throw Error('token is not found')
        
        //valido que el token este estrucutrado correctamente
        const {email, name, nickname} =  await jwt_emails.validateTokenAuth(token);

        //busco usuario en la base de dato
        const findUser = await User.findOne({
            where : {email, name, nickname}
        });

        //si no lo encuentro lanzo un error
        if(!findUser) throw Error('Usuario no encontrado')
        
        //busco registro de confirmacion de email
        const findEmailVerification = await EmailVerification.findOne({
            where : {userId : findUser.id}
        });
        if(findEmailVerification.used) throw Error('Este token ya fue utilizado');
        //verifico que no ha
        findEmailVerification.used = true;
        //modifico status del usuario
        findUser.status = 'active'
        await findUser.save()
        await findEmailVerification.save()
        
        res.status(200).json({ message: 'User validated successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = validateUser;