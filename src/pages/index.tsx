import { ConnectWallet, useAddress, useLogin } from "@thirdweb-dev/react";
import { PublicationSortCriteria, useExplorePublicationsQuery } from "@/graphql/generated";
import useLogin from "../lib/auth/useLogin"
import SignInButton from "../components/SignInButton"

export default function Home() {
  return <SignInButton />;
}
