import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
export const GLOBAL_AUTHORITY_SEED = "global-authority";

export const DEMO_PROGRAM_ID = new PublicKey(
  "8nAcpEP1angthtWaLNuAabELv7CFovddsSTSmFzErFeo"
);
export const TREASURY_WALLET = new PublicKey(
  "Am9xhPPVCfDZFDabcGgmQ8GTMdsbqEt1qVXbyhTxybAp"
);

export const DECIMALS = 1_000_000_000;

export const USER_POOL_SIZE = 48;

export interface GlobalPool {
  // 8 + 56
  admin: PublicKey;
  totalBoughtTickets: anchor.BN;
  ticketPrice: anchor.BN;
  endTimestamp: anchor.BN;
}

export interface UserPool {
  user: PublicKey;
  amount: anchor.BN;
}
