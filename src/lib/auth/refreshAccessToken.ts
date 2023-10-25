import { fetchData } from "@/graphql/auth-fetcher";
import { RefreshDocument, RefreshMutation, RefreshMutationVariables } from "@/graphql/generated";
import { readAccessToken, setAccessToken } from "./helpers";

export default async function refreshAccessToken() {

    // Read refresh token from storage
    const currentRefreshToken = readAccessToken()?.refreshToken;
    if (!currentRefreshToken) return null;

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
        const {accessToken, refreshToken: newRefreshToken} = result.refresh;
        
        setAccessToken(accessToken, newRefreshToken);

        return accessToken as string;
        
}