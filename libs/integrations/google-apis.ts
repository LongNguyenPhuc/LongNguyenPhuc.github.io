import { google } from 'googleapis'

/**
 * Helper function to fetch OAuth2 Consent Screen from Google \
 * Guides:
 *  - Using library: https://developers.google.com/identity/protocols/oauth2/web-server
 *  - No library: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
 */
export async function getGoogleOAuth2ConsentScreenUrl(
  /** Google client id */
  client_id: string,
  /** The URL for Google to send query responses to */
  redirect_uri: string,
  /** The scopes for use with google api */
  scopes: string[] = [],
  /** Use this to verify if the response is of your client */
  state = 'passthrough value'
) {
  /**
   * Generate a url
   * using the googleapis for Node.JS \
   *
   * Guide here: https://developers.google.com/identity/protocols/oauth2/web-server
   */
  const oauth2Client = new google.auth.OAuth2()
  const scope = [...new Set(['openid', 'profile', 'email', ...scopes])].join(' ')
  return oauth2Client.generateAuthUrl({
    // client: Google client id
    client_id,
    // Redirect uri
    redirect_uri,
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state
  })

  /**
   * Alternatively, if your app is client side only
   * or if you don't want to use the node.js library
   *
   * Uncomment the code bellow to use url based code \
   * Guide here: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
   */
  // const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

  // const params = new URLSearchParams({
  //   client_id,
  //   redirect_uri,
  //   response_type: 'code',
  //   scope,
  //   include_granted_scopes: 'true',
  //   access_type: 'offline',
  //   state
  // })
  // return `${oauth2Endpoint}?${params.toString()}`
}
