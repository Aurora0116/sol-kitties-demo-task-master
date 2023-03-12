import * as anchor from "@project-serum/anchor";
import { IDL as DemoIDL } from "./demo";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  GLOBAL_AUTHORITY_SEED,
  GlobalPool,
  DEMO_PROGRAM_ID,
  TREASURY_WALLET,
  UserPool,
  USER_POOL_SIZE,
} from "./types";
import axios from "axios";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { solConnection } from "./utils";
import { successAlert } from "../components/toastGroup";

/**
 * @dev Set Variables
 * @param endTimestamp The endTimestamp to deposit
 * @param ticketPrice The ticket Price
 */

export const setVariable = async (
  wallet: WalletContextState,
  endTimestamp: number,
  ticketPrice: number,
  startLoading: Function,
  closeLoading: Function,
  updatePage: Function
) => {
  if (!wallet.publicKey) return;
  let cloneWindow: any = window;
  const userAddress = wallet.publicKey;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(
    DemoIDL as anchor.Idl,
    DEMO_PROGRAM_ID,
    provider
  );
  startLoading();
  try {
    const tx = await setVariableTx(
      userAddress,
      endTimestamp,
      ticketPrice,
      program
    );
    let { blockhash } = await provider.connection.getLatestBlockhash(
      "confirmed"
    );
    tx.feePayer = wallet.publicKey as PublicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      let signedTx = await wallet.signTransaction(tx);

      let txId = await provider.connection.sendRawTransaction(
        signedTx.serialize(),
        {
          skipPreflight: true,
          maxRetries: 3,
          preflightCommitment: "confirmed",
        }
      );

      console.log(txId, "==> txId");

      await solConnection.confirmTransaction(txId, "finalized");

      successAlert("Transaction was confirmed!");
      closeLoading();
      updatePage();
    }
  } catch (error) {
    console.log(error);
    closeLoading();
  }
};

/**
 * @dev Init User Pool
 */
export const initUserPool = async (wallet: WalletContextState) => {
  if (!wallet.publicKey) return;
  let cloneWindow: any = window;
  const userAddress = wallet.publicKey;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(
    DemoIDL as anchor.Idl,
    DEMO_PROGRAM_ID,
    provider
  );
  try {
    const tx = await initUserPoolTx(userAddress, program);
    let { blockhash } = await provider.connection.getLatestBlockhash(
      "confirmed"
    );
    tx.feePayer = wallet.publicKey as PublicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      let signedTx = await wallet.signTransaction(tx);

      let txId = await provider.connection.sendRawTransaction(
        signedTx.serialize(),
        {
          skipPreflight: true,
          maxRetries: 3,
          preflightCommitment: "confirmed",
        }
      );

      console.log(txId, "==> txId");

      await solConnection.confirmTransaction(txId, "finalized");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @dev Buy Tickets by SOL
 * @param solAmount The amount of Sol to deposit on this project
 */
export const buyTicket = async (
  wallet: WalletContextState,
  solAmount: number,
  startLoading: Function,
  closeLoading: Function,
  updatePage: Function
) => {
  if (!wallet.publicKey) return;
  let cloneWindow: any = window;
  const userAddress = wallet.publicKey;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(
    DemoIDL as anchor.Idl,
    DEMO_PROGRAM_ID,
    provider
  );
  startLoading();

  let userPoolKey = await PublicKey.createWithSeed(
    userAddress,
    "user-pool",
    program.programId
  );
  let poolAccount = await solConnection.getAccountInfo(userPoolKey);
  if (poolAccount === null || poolAccount.data === null) {
    await initUserPool(wallet);
  }
  try {
    const tx = await buyTicketTx(userAddress, solAmount, program);
    let { blockhash } = await provider.connection.getLatestBlockhash(
      "confirmed"
    );
    tx.feePayer = wallet.publicKey as PublicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      let signedTx = await wallet.signTransaction(tx);

      let txId = await provider.connection.sendRawTransaction(
        signedTx.serialize(),
        {
          skipPreflight: true,
          maxRetries: 3,
          preflightCommitment: "confirmed",
        }
      );

      console.log(txId, "==> txId");

      await solConnection.confirmTransaction(txId, "finalized");
      successAlert("Transaction was confirmed!");
      await saveWalletAddress(wallet.publicKey.toBase58());
      closeLoading();
      updatePage();
    }
  } catch (error) {
    console.log(error);
    closeLoading();
  }
};

/**
 * Initialize Project Transaction
 * @param userAddress The User Address
 * @param program This program
 * @returns
 */
export const initProjectTx = async (
  userAddress: PublicKey,
  program: anchor.Program
) => {
  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );

  let tx = new Transaction();

  tx.add(
    program.instruction.initialize({
      accounts: {
        admin: userAddress,
        globalAuthority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

/**
 * Set Variable Transaction
 * @param userAddress The User Address
 * @param endTimestamp The endTimestamp to deposit
 * @param ticketPrice The ticket Price SOL
 * @param program The program
 * @returns
 */
export const setVariableTx = async (
  userAddress: PublicKey,
  endTimestamp: number,
  ticketPrice: number,
  program: anchor.Program
) => {
  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );

  let tx = new Transaction();

  console.log("==>Set Variables ...");

  tx.add(
    program.instruction.setVariable(
      new anchor.BN(endTimestamp),
      new anchor.BN(ticketPrice * LAMPORTS_PER_SOL),
      {
        accounts: {
          admin: userAddress,
          globalAuthority,
        },
      }
    )
  );

  return tx;
};

/**
 * Create Edit Project Transaction
 * @param userAddress The User Address
 * @param program This program
 * @returns
 */
export const initUserPoolTx = async (
  userAddress: PublicKey,
  program: anchor.Program
) => {
  // Get userPoolKey publickey with seed
  let userPoolKey = await PublicKey.createWithSeed(
    userAddress,
    "user-pool",
    program.programId
  );

  let ix = SystemProgram.createAccountWithSeed({
    fromPubkey: userAddress,
    basePubkey: userAddress,
    seed: "user-pool",
    newAccountPubkey: userPoolKey,
    lamports: await solConnection.getMinimumBalanceForRentExemption(
      USER_POOL_SIZE
    ),
    space: USER_POOL_SIZE,
    programId: program.programId,
  });

  let tx = new Transaction();
  console.log("==>Init User Pool ... ");
  tx.add(ix);
  tx.add(
    program.instruction.initUserPool({
      accounts: {
        user: userAddress,
        userPool: userPoolKey,
      },
    })
  );

  return tx;
};

/**
 * Buy Tickets Transaction
 * @param userAddress The User Address
 * @param ticketAmount The amount of tickets to buy on this project
 * @param program This program
 * @returns
 */
export const buyTicketTx = async (
  userAddress: PublicKey,
  ticketAmount: number,
  program: anchor.Program
) => {
  // Get userPoolKey publickey with seed
  let userPoolKey = await PublicKey.createWithSeed(
    userAddress,
    "user-pool",
    program.programId
  );

  // Get globalAuthority and bump
  const [globalAuthority, globalBump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    DEMO_PROGRAM_ID
  );

  let tx = new Transaction();

  console.log("==>Buy Tickets ...");

  tx.add(
    program.instruction.buyTickets(new anchor.BN(ticketAmount), {
      accounts: {
        user: userAddress,
        userPool: userPoolKey,
        globalAuthority,
        treasuryWallet: TREASURY_WALLET,
        systemProgram: SystemProgram.programId,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

/**
 * Get Global State
 */
export const getGlobalState = async (): Promise<GlobalPool | null> => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(
    DemoIDL as anchor.Idl,
    DEMO_PROGRAM_ID,
    provider
  );
  const [globalAuthority, _] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    DEMO_PROGRAM_ID
  );
  try {
    let globalState = await program.account.globalPool.fetch(globalAuthority);
    return globalState as unknown as GlobalPool;
  } catch {
    return null;
  }
};

/**
 * Get the TaskList state
 * @param creator The project's creator publickey
 * @param program The program
 * @returns
 */
export const getUserPoolState = async (
  creator: PublicKey,
  program: anchor.Program
): Promise<UserPool | null> => {
  let taskList = await PublicKey.createWithSeed(
    creator,
    "user-pool",
    program.programId
  );
  try {
    let userPoolState = await program.account.taskList.fetch(taskList);
    return userPoolState as unknown as UserPool;
  } catch {
    return null;
  }
};

const saveWalletAddress = async (wallet: string) => {
  await axios
    .get(`http://localhost:8080/storeAddress?address=${wallet}`)
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
};
