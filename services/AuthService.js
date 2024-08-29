const  {google}  = require('googleapis');


/**
 * Service for handling authentication information
 */
class AuthService {
  static #CLIENT_ID ='719268423921-jt6fj84id8a4a9ubq76pg4fjvftnahbh.apps.googleusercontent.com';
  static #CLIENT_SECRET ='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' ;
  static #REDIRECT_URI ='http://localhost:3001/api/auth/cookie';
  static #SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

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
  console.log('ente a handle');
  
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
    const data = await this.#oauthClient.verifyIdToken({idToken});
    return data.getPayload();
  }

  async revokeRefreshToken(refreshToken) {
    await this.#oauthClient.revokeToken(refreshToken);
  }
}

module.exports = AuthService;