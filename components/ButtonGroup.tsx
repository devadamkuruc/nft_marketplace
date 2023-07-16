import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { Button } from "@/components";
import { NFTContext } from "@/context/NFTContext";
import { useContext } from "react";

interface Props {
  setActive: (item: string) => void;
  router: AppRouterInstance;
}

const ButtonGroup = ({ setActive, router }: Props) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive("");
        router.push("/create-nft");
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};

export default ButtonGroup;
