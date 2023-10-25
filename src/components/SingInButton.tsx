import React from 'react'
import { ConnectWallet, useAddress, useNetwork, useNetworkMismatch, ChainId, MediaRenderer } from "@thirdweb-dev/react"

type Props = {};

export default function SignInButton({}: Props){
    
    const address = useAddress() // Detect connected addresss
    const isOnWrongNetwork = useNetworkMismatch() // Detect if user is on wrong network
    const [, switchNetwork] = useNetwork() // Function to switch the network

    // 1. User needs to connect wallet
        if (!address) {
            return <ConnectWallet />;
        }

    // 2. User needs to switch to Polygon Network
        if (isOnWrongNetwork) {
            return (
                <button
                onClick={() => switchNetwork?.(ChainId.Polygon)}>
                    Switch Network
                </button>
            )
        }

    // 3. Sign in with Lens (Request and sign challenge from Lens API for access token)
    // Refresh token lasts 30 minutes. Must update refresh token every 30 min.    

    // 4. Show the user their profile on Lens or other landing page
}
