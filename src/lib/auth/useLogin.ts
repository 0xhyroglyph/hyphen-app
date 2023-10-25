import { useAuthenticationMutation } from "@/graphql/generated";
import { useMutation } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallenge";
import { setAccessToken } from "./helpers";

// 1. Assure user has connected wallet

export default function useLogin() {
    const address = useAddress();
    const sdk = useSDK();
    const {mutateAsync: sendSignedMessage} = useAuthenticationMutation();
    
    async function login(){
        if (!address) return;

        // 2. Generate challenge from Lens API
        const { challenge } = await generateChallenge(address);

        // 3. Sign challenge with user's wallet
        const signature = await sdk?.wallet.sign(challenge.text)

        // 4. Send signed challenge to Lens API
        const { authenticate } = await sendSignedMessage({
                request: {
                    address,
                    signature,
                }
            })
    }
    console.log("Authenticated:", authenticate);
    
    // 5. Receeive access token from Lens API if successful
    const {accessToken, refreshToken} = authenticate;

    setAccessToken(accessToken, refreshToken);

    // 6. Store access token in local storage so it can be used 
    
        return useMutation(login);

}
