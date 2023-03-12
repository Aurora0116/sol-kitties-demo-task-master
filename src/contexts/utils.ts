import { PublicKey } from "@solana/web3.js";
import { web3 } from '@project-serum/anchor';
import { programs } from "@metaplex/js";
import { NETWORK } from "../config";
import { WalletContextState } from "@solana/wallet-adapter-react";

export const solConnection = new web3.Connection(web3.clusterApiUrl(NETWORK));

export const getNftMetaData = async (nftMintPk: PublicKey) => {
    let { metadata: { Metadata } } = programs;
    let metadataAccount = await Metadata.getPDA(nftMintPk);
    const metadata = await Metadata.load(solConnection, metadataAccount);
    return metadata.data.data.uri;
}