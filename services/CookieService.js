/**
 * Service for handling cookies
 */
require('dotenv').config();
const {DOMAIN_COOKIES_SERVICE} = process.env;

class CookieService {
 
    static REFRESH_TOKEN_COOKIE = {
      name: 'REFRESH_TOKEN_COOKIE',
      cookie: {
        domain:DOMAIN_COOKIES_SERVICE,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/api/auth/refresh',
        // 5 years
        maxAge: 5 * 365 * 24 * 60 * 60 * 1000
      }
    };
    static REFRESH_TOKEN_COOKIE_LOGOUT = {
      name: 'REFRESH_TOKEN_COOKIE_LOGOUT',
      cookie: {
        domain:DOMAIN_COOKIES_SERVICE,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/api/auth/logout',
        // 5 years
        maxAge: 5 * 365 * 24 * 60 * 60 * 1000
      }
    };
    static ID_TOKEN_COOKIE = {
      name: 'ID_TOKEN_COOKIE',
      cookie: {
        domain:DOMAIN_COOKIES_SERVICE,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        // 1 hr
        maxAge: 60 * 60 * 1000
      }
    };
  }

  module.exports = CookieService;