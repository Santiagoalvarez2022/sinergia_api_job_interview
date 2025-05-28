const jwt = require('jsonwebtoken');


const createToken = ({name, email, nickname}) =>{
  console.log('create token ',name, email, nickname );
  
    return jwt.sign(
    {   
        email,
        name,
        nickname
    },
        process.env.JWT_EMAILS,
        { expiresIn: '8h' }
    )
}

const validateTokenAuth = async (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_EMAILS, async (err, user) => {
        console.log(err, user);
        
        if (err) {
          return reject({ message: 'invalid token' });
        }
        resolve(user); // Resuelve la promesa con la información del usuario
      });
    });
  };
module.exports = {
    createToken,
    validateTokenAuth
}