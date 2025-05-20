const { User,EmailVerification } = require('../../db/index.js');
const emailService = require('../../services/nodemailer/nodemailer.js')
const bcrypt = require('bcrypt');
const jwt_emails = require('../../utils/jwt_emails/jwt_verification_user.js')

const requestResetPassword = async(req,res) =>{
    try {
        let { email} = req.body;
        //busco usuario
        let findUser = await User.findOne({
            where : {email}
        });

        if (!findUser) throw Error('Usuario no encontrado.');

        const token = jwt_emails.createToken({
            name:findUser.name,
            email,
            nickname:findUser.nickname});

        await emailService.sendRequestPassword(email, findUser.nickname,token)

        console.log(findUser);
        res.status(200).json({message:"El email para recuperar la contraseña se envio con exito."})


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updatePassword = async(req,res) =>{
    try {
        let {newPassword, token} = req.body;
           console.log('llegue a actualizar la contraseña ', newPassword, token);
        
        if (!token || !newPassword) throw Error('Parametros necesarios vacios.')
        
        const {email, name, nickname} =  await jwt_emails.validateTokenAuth(token);

        console.log('resultados de la validacion del token ', email, name, token);
        

        //busco usuario
        let findUser = await User.findOne({
            where : {nickname}
        });

        if (!findUser) throw Error('Usuario no encontrado.');
        
        //actualizar contraseña 
        // Define el número de rondas para generar la sal en el hash
        const saltRounds = 10;
        
        // Hashea la contraseña con bcrypt
        newPassword = await bcrypt.hash(newPassword, saltRounds);

        findUser.password = newPassword;
        await findUser.save();
        await emailService.successUpdatePassword(findUser.email,findUser.nickname)
       
        res.status(200).json({message:"La contraseña ha sido actualizada con éxito."})


    } catch (error) {
        res.status(400).json({ error: error.message })
        
    }
}


module.exports = {
    requestResetPassword,
    updatePassword
}