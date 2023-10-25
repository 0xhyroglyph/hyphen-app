import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helpers";
import { useDefaultProfileQuery } from "@/graphql/generated";
import { profile } from "console";

export default function useLensUser() {
    // Make react query for local storage key
    const address = useAddress();

    const localStorageQuery = useQuery(
        ["lens-user", address],

        // Function to check local storage
        () => readAccessToken()
    );

    // if connected wallet, ask for default profile
    const profileQuery = useDefaultProfileQuery({
        request: {
            ethereumAddress: address,
        }
    },
    {
        enabled: !!address, 
    }
    );

    return {
        // info about local storage and lens profile
        isSignedInQuery: localStorageQuery,
        profileQuery: profileQuery,
    };
}