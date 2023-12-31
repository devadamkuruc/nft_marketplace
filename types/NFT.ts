import { BigNumberish } from "ethers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export interface NFT {
  image?: string;
  name: string;
  price: string;
  seller: string;
  owner: string;
  description: string;
}

export interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  uploadToIPFS: (file: File) => Promise<IUploadToIPFSResponse>;
  createNFT: (
    formInput: IFormInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => Promise<void>;
  fetchNFTs: () => Promise<IFormattedNFT[]>;
  fetchMyNFTsOrListedNFTs: (type: string) => Promise<IFormattedNFT[]>;
  buyNFT: (nft: IFormattedNFT) => Promise<void>;
  createSale: (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => Promise<void>;
}

export interface IUploadToIPFSResponse {
  success: boolean;
  message: string;
}

export interface IFormInput {
  name: string;
  description: string;
  price: string;
}

export interface ICreateNFTProps {
  formInput: IFormInput;
  fileURL: string;
  router: AppRouterInstance;
}

export interface INFTMetadata {
  name: string;
  description: string;
  image: string;
}

export interface IRawNFT {
  tokenId: BigNumberish;
  seller: string;
  owner: string;
  price: BigNumberish;
}

export interface IFormattedNFT {
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  price: string;
  tokenURI: string;
}

export type ActiveSelectOption =
  | "Recently added"
  | "Price(low to high)"
  | "Price(high to low)";

export interface SortingMethod {
  (a: IFormattedNFT, b: IFormattedNFT): number;
}
