import React from 'react'
import { ConnectWallet, useAddress, useNetwork, useNetworkMismatch, ChainId, MediaRenderer } from "@thirdweb-dev/react"
import useLogin from "../lib/auth/useLogin"
import useLensUser from '@/lib/auth/useLensUser';

type Props = {};

export default function SignInButton({}: Props){
    
    const address = useAddress() // Detect connected addresss
    const isOnWrongNetwork = useNetworkMismatch() // Detect if user is on wrong network
    const [, switchNetwork] = useNetwork() // Function to switch the network
    const {isSignedInQuery, profileQuery} = useLensUser();
    const {mutate: requestLogin} = useLogin();

    // 1. User needs to connect wallet
        if (!address) {
            return <ConnectWallet />;
        }

    // 2. User needs to switch to Polygon Network
        if (isOnWrongNetwork) {
            return (
                <button onClick={() => switchNetwork?.(ChainId.Polygon)}>
                    Switch Network
                </button>
            )
        }
    
        // Loading Signed-in State
        if (isSignedInQuery.isLoading) {
            return <div>Welcome to Hyphen</div>;
        }

        // If user not signed in, request login
        if (!isSignedInQuery.data) {
            return <button onClick ={() => requestLogin()}> Connect with Lens</button>;
        }

        // Loading Profile Information
        if (profileQuery.isLoading) {
            return <div>Loading your experience.</div>;
        }

        // If done loading but no default profile
        if (!profileQuery.data?.defaultProfile) {
            return <div>No Lens profile available.</div>
        }

        // If done loading and there is a default profile
        if (profileQuery.data?.defaultProfile) {
            return <div>Hello {profileQuery.data?.defaultProfile?.handle</div>
        }

        return (
            <div>Something went wrong.</div>
        )
    }
