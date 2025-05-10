const express = require('express');
const { createUser, logIn } = require('../../controllers/logIn/createUser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {User} = require('../../db/index.js')
const bcrypt = require('bcrypt');
const validateUser = require('../../controllers/logIn/validateUser.js');
dotenv.config();




router.post('/createuser', createUser);
router.post('/validateuser', validateUser)

router.post('/login', (async(req,res)=>{
    try {
      const {nickname, password} = req.body
      /*
      generar token
      */
      const result = await User.findOne({where:{
        nickname
      }})
      if (!result) throw Error('Usuario no encontrado');
      // Compara la contraseña ingresada con la contraseña hasheada
      const esValido = await bcrypt.compare(password, result.dataValues.password);
      if (!esValido) throw Error('Contraseña incorrecta');
      
      //generar jwt
      const token = jwt.sign(
        { 
          id: result.dataValues.id, 
          name: result.dataValues.name},
          process.env.JWT_SECRET,
        { expiresIn: '8h' }  // Expiración del token (puede variar)
    );
    console.log('login exitoso');
    
    res.status(200).json({ message: 'Login exitoso',token });

 } catch (error) {
  
  res.status(400).json(error.message )}
      
}))

module.exports = router;

