import { ChallengeDocument, ChallengeQuery, ChallengeQueryVariables} from "@/graphql/generated";
import { fetchData } from "@/graphql/auth-fetcher";

export default async function generateChallenge(address: string) {
    return await fetchData<ChallengeQuery, ChallengeQueryVariables>(ChallengeDocument, {
        request: {
            address,
        },
    })();
}