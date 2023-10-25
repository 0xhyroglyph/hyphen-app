// Logic to run on all requests to Lens GraphQL Server

import { isTokenExpired, readAccessToken } from "@/lib/auth/helpers"
import refreshAccessToken from "@/lib/auth/refreshAccessToken";

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {

  async function getAccessToken() {
    // Check local storage for access token
    const token = readAccessToken();
    
    // If not, return null (not signed in)
    if (!token) return null;
    
    let accessToken = token?.accessToken;

    // If there is, check expiration
    if (isTokenExpired(token.exp)) {
    // If yes but expired, update with refresh token
      const newToken = await refreshAccessToken();
      if (!newToken) return null
      accessToken = newToken;
    }

    // Return access token
    return accessToken;
  }


  return async () => {
    const token = typeof window !== "undefined" ? await getAccessToken() : null;

    const res = await fetch("https://api.lens.dev", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        ...options,
        "x-access-token": token ? token : "",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
 
    const json = await res.json()
 
    if (json.errors) {
      const { message } = json.errors[0] || {}
      throw new Error(message || 'Error…')
    }
 
    return json.data
  }
}