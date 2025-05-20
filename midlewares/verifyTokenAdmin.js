const jwt = require('jsonwebtoken');
const {Admin} = require('../db/index.js')
const {JWT_SECRET_ADMIN} = process.env




const verifyTokenAdmin = (req, res, next) =>{
    const token = req.cookies.t_a
   try {
        if (!token) throw Error('no hay token');
       
        // Verificamos el token
        jwt.verify(token,  JWT_SECRET_ADMIN , async (err, user) => {
            if (err) return res.status(403).json({ message: 'invalid token' });
            const findAdmin = await Admin.findByPk(user.id)
            if (!findAdmin) throw Error('Admin not found')
            req.user = user; // Guardamos los datos del usuario en req.user
            next(); // Pasamos al siguiente middleware o controlador
        });

   } catch (error) {
        console.error('ERROR ===================>',error);
        
        res.status(400).json(error);
   }

}

module.exports = verifyTokenAdmin;