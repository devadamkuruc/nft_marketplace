"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { images } from "../assets";
import { NFT } from "@/types/NFT";
import { NFTContext } from "@/context/NFTContext";

interface Props {
  nft: NFT;
}

const NFTCard = ({ nft }: Props) => {
  const { nftCurrency } = useContext(NFTContext);
  const nftString = encodeURIComponent(JSON.stringify(nft));

  return (
    <Link href={{ pathname: "/nft-details", query: nftString }}>
      <div className="flex-1 min-w-215 minsm:min-w-200 sm:min-w-155 minmd:min-w-224 minlg:min-w-288 dark:bg-nft-black-3 bg-white rounded-2xl p-4 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.image || images[`nft${nft.i}`]}
            layout="fill"
            objectFit="cover"
            alt={`nft${nft.i}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {nft.price}
              <span className="normal">
                {` `}
                {nftCurrency}
              </span>
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {nft.seller}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
