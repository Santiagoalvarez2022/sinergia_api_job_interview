const express = require('express');
const { createUser, logIn } = require('../../controllers/logIn/createUser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {User} = require('../../db/index.js')
const bcrypt = require('bcrypt');

dotenv.config();


router.post('/createUser', (async(req,res)=>{
  try {
    //parea recuperar la contraseña estaria bueno solo enviar un email con la contraseña

    const {nickname, password, name} = req.body
    if(!nickname || !password || !name)  throw Error(`Debes completar todos los campos para crear una cuenta`)  

   const result = await createUser(nickname,password, name)
  
   console.log("result", result);
   
   if(!result) throw Error(`${nickname} ya esta siendo utilizado como nombre de Usuario`)
   
    res.status(200).json({result})
   
} catch (error) {res.status(400).json(error.message )};
    
}))





router.post('/login', (async(req,res)=>{
    try {
      const {nickname, password} = req.body
      /*
      generar token
      */
      const result = await User.findOne({where:{
        nickname
      }})
      if (!result) throw Error('Usuario no encontrado')
      // Compara la contraseña ingresada con la contraseña hasheada
      const esValido = await bcrypt.compare(password, result.dataValues.password);
      if (!esValido) throw Error('Contraseña incorrecta')
      
      //generar jwt
      const token = jwt.sign(
        { 
          id: result.dataValues.id, 
          nickname: result.dataValues.nickname },
          process.env.JWT_SECRET,
        { expiresIn: '8h' }  // Expiración del token (puede variar)
    );
    console.log('login exitoso');
    
    res.status(200).json({ message: 'Login exitoso',token });

 } catch (error) {
  
  res.status(400).json(error.message )}
      
  }))

module.exports = router;

/*


    //evaluar a result como correcto o 
             // Generar el token JWT
        const token = jwt.sign(
            { id: result.dataValues.id, username: user.nickname },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }  // Expiración del token (puede variar)
        );

        // Establecer el token en una cookie con las medidas de seguridad
        res.cookie('token', token, {
            httpOnly: true,   // No accesible desde JavaScript
            secure: process.env.NODE_ENV === 'production',  // Solo en HTTPS en producción
            sameSite: 'Strict',  // Protección contra CSRF
            maxAge: 3600000  // La cookie expira en 1 hora (ajustable)
        });

*/