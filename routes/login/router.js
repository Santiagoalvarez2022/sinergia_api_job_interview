const express = require('express');
const router = express.Router();
const CookieService = require('../../services/CookieService')
const AuthService = require('../../services/AuthService.js');
const { createUser } = require('../../controllers/logIn/createUser.js');
const {SECRET_KEY} = process.env;

const jwt = require('jsonwebtoken');

router.get('/login', (req, res) => {
  console.log('entre a auth/login ');
  const {redirectTo} = req.query;
  const authService = new AuthService();
  const authUrl = authService.generateAuthUrl(redirectTo);
  return res.redirect(authUrl);
});





router.get('/cookie', async (req, res, next) => {
  console.log('entre a /cookie');
  console.log("querys en cokie", req.query);
  
  try {
    const {code,state} = req.query;
  // Decodifica el estado para usarlo en la redirección
    const redirectTo = decodeURIComponent(state);
    const authService = new AuthService();
    const result = await authService.handleOAuthRedirect(code);

    console.log('pase el handle');
    
    // Set Cookies
    res.cookie(CookieService.ID_TOKEN_COOKIE.name, result.idToken, CookieService.ID_TOKEN_COOKIE.cookie);
    res.cookie(CookieService.REFRESH_TOKEN_COOKIE.name, result.refreshToken, CookieService.REFRESH_TOKEN_COOKIE.cookie);
    res.cookie(CookieService.REFRESH_TOKEN_COOKIE_LOGOUT.name, result.refreshToken, CookieService.REFRESH_TOKEN_COOKIE_LOGOUT.cookie);

    const userData = await authService.getUserData(result.idToken);
    //verifico si el usuario existe en la base de datos si no lo creo
    if (userData) {

      //creo usuario en la base de datos 
      const result = await createUser(userData)
      //creo token 
      console.log('result de usuario', result);
      
       const token = jwt.sign(
         { 
         id: result.newUser.userId, 
         email: result.newUser.email
         },
         SECRET_KEY, // Reemplaza con tu clave secreta
       );


      //  console.log('token creado ', token);
      


      // return res.redirect(`${redirectTo}?token=${token}`);
      return res.redirect(`${redirectTo}?id=${result.newUser.id}&&name=${result.newUser.name}`);
      // res.redirect(redirectTo)
    }


  } catch (err) {
    console.error('Error handling redirect', err);
    return next(err);
  }
});

router.get('/profile', (req, res, next) => {
  console.log('entre al profile');
  
  try {


    const {email, name, picture} = res.locals.user;
    console.log(re.locals.user, 'datos del usuario');
    

    return res.json({email, name, picture});
  } catch (err) {
    console.error('Error sending profile page', err);
    return next(err);
  }
});





 router.get('/verifySession',async(req,res)=>{
     console.log(req.cookies, "req");
     console.log("entre en login/verify");
     try {
             const idToken = req.cookies[CookieService.ID_TOKEN_COOKIE.name];
             if (!idToken) {
                 console.log('No ID Token found, sending login page');
                 //al no encontrar un token envio una respuesta negativa al front para que alli se logeen desde una redirecion a google
                 res.status(200).json({token:false})
               }
             //   return res.redirect('/profile');
         } catch (error){ res.status(400).json({error})}
 });


    module.exports = router;