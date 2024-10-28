require('dotenv').config();
const  {google}  = require('googleapis');
const {CLIENT_SECRET, CLIENT_ID,REDIRECT_URI,NODE_ENV,COOKIE_DOMAIN,FIRST_SCOPES,SECOND_SCOPES} = process.env;

/**
 * Service for handling authentication information
 */


class AuthService {
  static #CLIENT_ID =CLIENT_ID;
  static #CLIENT_SECRET =CLIENT_SECRET ;
  static #REDIRECT_URI =REDIRECT_URI;
  static #SCOPES = [FIRST_SCOPES,SECOND_SCOPES];

  #oauthClient;

  /** 
   * @constructor
   */
  constructor() {
    this.#oauthClient = new google.auth.OAuth2(
      AuthService.#CLIENT_ID,
      AuthService.#CLIENT_SECRET,
      AuthService.#REDIRECT_URI
    );
  }

  /**
   * Generates an authentication URL
   * @returns
   */
  generateAuthUrl(redirectTo="") {
    console.log('generateAuthUrl');

    return this.#oauthClient.generateAuthUrl({
      access_type: 'offline',
      scope: AuthService.#SCOPES,
      include_granted_scopes: true,
      // Display the consent screen to the user
      prompt: 'consent',
      state: encodeURIComponent(redirectTo)
    });
  }

  /**
 * Extracts the authorization code from the redirect url and
 * uses it to generate the access, ID, and refresh tokens.
 * @param {*} authCode
 */
async handleOAuthRedirect(authCode) {
  console.log('ente a handleAuth');
  
    const {tokens} = await this.#oauthClient.getToken(authCode);
    return {
      idToken: tokens.id_token,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    };
  }

  async getNewIDToken(refreshToken) {
    this.#oauthClient.setCredentials({refresh_token: refreshToken});
    const tokens = await this.#oauthClient.refreshAccessToken();
    return tokens.credentials.id_token;
  }

  async getUserData(idToken) {
    console.log('entre a getuserdata');
    
    const data = await this.#oauthClient.verifyIdToken({idToken});
    return data.getPayload();
  }

  async revokeRefreshToken(refreshToken) {
    console.log('entre a revokeRefreshToken');

    await this.#oauthClient.revokeToken(refreshToken);
  }
}

module.exports = AuthService;