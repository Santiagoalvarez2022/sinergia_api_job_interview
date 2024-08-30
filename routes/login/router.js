const express = require('express');
const router = express.Router();
const CookieService = require('../../services/CookieService')
const AuthService = require('../../services/AuthService.js');
const { createUser } = require('../../controllers/logIn/createUser.js');




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

      const result = await createUser(userData)

      res.redirect(redirectTo)
    }


  } catch (err) {
    console.error('Error handling redirect', err);
    return next(err);
  }
});

router.get('/profile', (req, res, next) => {

  try {


    const {email, name, picture} = res.locals.user;
    return res.json({email, name, picture});
  } catch (err) {
    console.error('Error sending profile page', err);
    return next(err);
  }
});

router.get('/refresh', async (req, res) => {
  console.log('Obtaining new ID token with the refresh token');
  // Get the refresh token, will only be present on /refresh call
  const refreshToken = req.cookies[CookieService.REFRESH_TOKEN_COOKIE.name];
  // Refresh token is not present
  if (!refreshToken) {
    console.log('Refresh token not found.');
    return res.sendStatus(401);
  }
  // Create a new ID token and set it on the cookie
  try {
    const authService = new AuthService();
    // Get a non-expired ID token, after refreshing if necessary
    const newIDToken = await authService.getNewIDToken(refreshToken);
    res.cookie(CookieService.ID_TOKEN_COOKIE.name, newIDToken, CookieService.ID_TOKEN_COOKIE.cookie);
    console.log('New ID token generated', newIDToken);
    return res.sendStatus(200);
  // Invalid refreshToken, clear cookie
  } catch (err) {
    console.log('Invalid refresh token');
    res.clearCookie(CookieService.REFRESH_TOKEN_COOKIE.name, CookieService.REFRESH_TOKEN_COOKIE.cookie);
    return res.sendStatus(401);
  }
});

router.get('/logout', async (req, res, next) => {
  try {
    // Revoke refresh token access
    const refreshToken = req.cookies[CookieService.REFRESH_TOKEN_COOKIE_LOGOUT.name];
    const authService = new AuthService();
    await authService.revokeRefreshToken(refreshToken);

    // To clear a cookie you must have the same path specified.
    res.clearCookie(CookieService.ID_TOKEN_COOKIE.name, CookieService.ID_TOKEN_COOKIE.cookie);
    res.clearCookie(CookieService.REFRESH_TOKEN_COOKIE.name, CookieService.REFRESH_TOKEN_COOKIE.cookie);
    res.clearCookie(CookieService.REFRESH_TOKEN_COOKIE_LOGOUT.name, CookieService.REFRESH_TOKEN_COOKIE_LOGOUT.cookie);
    return res.redirect('/');
  } catch (err) {
    console.error('Error logging out', err);
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