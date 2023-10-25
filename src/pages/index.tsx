import { ConnectWallet, useAddress, useLogin } from "@thirdweb-dev/react";
import { PublicationSortCriteria, useExplorePublicationsQuery } from "@/graphql/generated";

export default function Home() {
  const address = useAddress();
  const { mutate: requestLogin } = useLogin()

  if (!address) { 
    return (<ConnectWallet/>)
  }
  
  return <button onClick={() => requestLogin()}>Login</button>;
}
