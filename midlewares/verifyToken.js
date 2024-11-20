const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { UserExist } = require('../controllers/users/UserExist');

dotenv.config();

// Middleware para verificar el token
const authenticateToken =  (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('entre al midleware', authHeader);
    
    // El token viene en formato "Bearer <token>", así que necesitamos separar
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    // Verificamos el token
    jwt.verify(token,  process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        
        console.log('user en midleware   ', user  );
        const findUser = await UserExist(user.id)

        req.user = user; // Guardamos los datos del usuario en req.user
        next(); // Pasamos al siguiente middleware o controlador
    });
};

module.exports = authenticateToken;
