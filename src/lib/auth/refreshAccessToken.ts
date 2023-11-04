import { fetchData } from "@/graphql/auth-fetcher";
import { ChallengeQueryVariables, RefreshDocument, RefreshMutation, RefreshMutationVariables } from "@/graphql/generated";
import { readAccessToken, setAccessToken } from "./helpers";

export default async function refreshAccessToken() {

    // Read refresh token from storage
    const currentRefreshToken = readAccessToken()?.refreshToken;
    if (!currentRefreshToken) return null;

    async function fetchData<TData, TVariables>(
        query: string,
        variables?: TVariables,
        options?: RequestInit["headers"]
    )
    {
            const res = await fetch("https://api.lens.dev", {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                ...options,
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

    // Send to Lens ot ask for new access token
    const result = await fetchData<RefreshMutation, RefreshMutationVariables>(
        RefreshDocument,
        {
            request: {
                refreshToken: currentRefreshToken,
        },
        }
    )();

    // Set new access token in local storage
        const {accessToken, refreshToken: newRefreshToken} = = await fetchData<
        RefreshMutation,
        RefreshMutationVariables
        >(RefreshDocument, {
            request: 
            refreshAccessToken
        } )
        result.refresh;
        
        setAccessToken(accessToken, newRefreshToken);

        return accessToken as string;
        
}