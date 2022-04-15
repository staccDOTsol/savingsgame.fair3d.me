// @ts-nocheck
import * as anchor from '@project-serum/anchor';
import { usePublicKey } from '@strata-foundation/react';
import { TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import { LAMPORTS_PER_SOL, TransactionInstruction } from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  getAtaForMint,
  getFairLaunchTicketSeqLookup,
} from './utils';

export const FAIR_LAUNCH_PROGRAM = new anchor.web3.PublicKey(
  'knGjLrbC9CBfMmfUzPkBM5ceXUNar2Ape13ZvkuXGzW',
);

export interface FairLaunchAccount {
  id: anchor.web3.PublicKey;
  program: anchor.Program;
  state: FairLaunchState;

  
  treasury: number;
}
export interface FairLaunchState {
  authority: anchor.web3.PublicKey;
  dev: anchor.web3.PublicKey;
  bump: number;

  currentMedian: anchor.BN;
  currentEligibleHolders: anchor.BN;
  last: anchor.BN;

  data: {
    last: anchor.BN;
    fee: anchor.BN;
    numberOfTokens: anchor.BN;
    phaseOneEnd: anchor.BN;
    phaseOneStart: anchor.BN;
    phaseTwoEnd: anchor.BN;
    priceRangeEnd: anchor.BN;
    priceRangeStart: anchor.BN;
    lotteryDuration: anchor.BN;
    tickSize: anchor.BN;
    uuid: string;
  };
  numberTicketsDropped: anchor.BN;
  numberTicketsPunched: anchor.BN;
  numberTicketsSold: anchor.BN;
  numberTicketsUnSeqed: anchor.BN;
  numberTokensBurnedForRefunds: anchor.BN;
  numberTokensPreminted: anchor.BN;
  phaseThreeStarted: boolean;
  tokenMint: anchor.web3.PublicKey;
  tokenMintBump: number;
  treasury: anchor.web3.PublicKey;
  treasuryBump: number;
  treasuryMint: anchor.web3.PublicKey; // only for SPL tokens
  treasurySnapshot: null;
}

export const getFairLaunchState = async (
  anchorWallet: typeof anchor.Wallet,
  fairLaunchId: anchor.web3.PublicKey,
  connection: anchor.web3.Connection,
): Promise<FairLaunchAccount> => {
  const provider = new anchor.Provider(connection, anchorWallet, {
    preflightCommitment: 'recent',
  });

  const idl = await anchor.Program.fetchIdl(FAIR_LAUNCH_PROGRAM, provider);
// @ts-ignore
  const program = new anchor.Program(idl, FAIR_LAUNCH_PROGRAM, provider);
  const state: any = await program.account.fairLaunch.fetch(fairLaunchId);
  console.log(1)
//console.log(state)
 
  const treasury = await program.provider.connection.getBalance(state.treasury);


  return {
    id: fairLaunchId,
    state,
    program,
    treasury,
  };
};

const getSetupForTicketing = async (
  anchorProgram: anchor.Program,
  amount: number,
  pubkey: anchor.web3.PublicKey,
): Promise<{
  remainingAccounts: {
    pubkey: anchor.web3.PublicKey | null;
    isWritable: boolean;
    isSigner: boolean;
  }[];
  instructions: TransactionInstruction[];
  signers: anchor.web3.Keypair[];
  amountLamports: number;
}> => {
  
  const remainingAccounts = [];
  const instructions = [];
  const signers = [];

  let amountLamports = 0;
  //@ts-ignore
  
      amountLamports = Math.ceil(amount * LAMPORTS_PER_SOL);
    
  return {
    remainingAccounts,
    instructions,
    signers,
    amountLamports,
  };
};

export const receiveRefund = async (
  anchorWallet: typeof anchor.Wallet,
  fairLaunch: FairLaunchAccount | undefined,
) => {
  if (!fairLaunch) {
    return;
  }

  const buyerTokenAccount = (
    await getAtaForMint(fairLaunch.state.tokenMint, anchorWallet.publicKey)
  )[0];

  const transferAuthority = anchor.web3.Keypair.generate();

  const signers = [transferAuthority];
  const instructions = [
    Token.createApproveInstruction(
      TOKEN_PROGRAM_ID,
      buyerTokenAccount,
      transferAuthority.publicKey,
      anchorWallet.publicKey,
      [],
      1,
    ),
  ];

  const remainingAccounts = [];

  if (fairLaunch.state.treasuryMint) {
    remainingAccounts.push({
      pubkey: fairLaunch.state.treasuryMint,
      isWritable: true,
      isSigner: false,
    });
    remainingAccounts.push({
      pubkey: (
        await getAtaForMint(
          fairLaunch.state.treasuryMint,
          anchorWallet.publicKey,
        )
      )[0],
      isWritable: true,
      isSigner: false,
    });
  }

  console.log(
    'tfr',
    fairLaunch.state.treasury.toBase58(),
    anchorWallet.publicKey.toBase58(),
    buyerTokenAccount.toBase58(),
  );
  await fairLaunch.program.rpc.receiveRefund({
    accounts: {
      fairLaunch: fairLaunch.id,
      treasury: fairLaunch.state.treasury,
      buyer: anchorWallet.publicKey,
      buyerTokenAccount,
      transferAuthority: transferAuthority.publicKey,
      tokenMint: fairLaunch.state.tokenMint,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    },
// @ts-ignore
    __private: { logAccounts: true },
    remainingAccounts,
    instructions,
    signers,
  });
};

const fairLaunchId = new anchor.web3.PublicKey(
  "6A5bT4dQ7VbN1G88WNM3oAKoDMQ3CmYSTjPXSCikHCWy",
);


export const getFairLaunchTicket = async (
  tokenMint: anchor.web3.PublicKey,
  buyer: anchor.web3.PublicKey,
): Promise<[anchor.web3.PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from('fair_launch'), tokenMint.toBuffer(), buyer.toBuffer()],
    FAIR_LAUNCH_PROGRAM,
  );
}
export const purchaseTicket = async (
  amount: number,
  pubkey:  anchor.web3.PublicKey,
  fairLaunch: FairLaunchAccount | undefined,
) => {

  const [fairLaunchTicket, bump] = await getFairLaunchTicket(
    //@ts-ignore
    fairLaunch.state.tokenMint,
    pubkey,
  );

  const remainingAccounts, instructions, signers = []
const 
amountLamports = Math.ceil(amount * LAMPORTS_PER_SOL);

console.log(instructions)
console.log(fairLaunch)
  try {
    console.log('Amount', amountLamports);
    await fairLaunch.program.rpc.purchaseTicket(
      // @ts-ignore
      bump,
      new anchor.BN(amountLamports),
      {
          // @ts-ignore
        accounts: {
          fairLaunch: fairLaunch.id,
          //@ts-ignore
          treasury: fairLaunch.state.treasury,
          buyer: pubkey,
          payer: pubkey,
          //@ts-ignore
          systemProgram: anchor.web3.SystemProgram.programId,
          //@ts-ignore
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          //@ts-ignore
          clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        },
        //__private: { logAccounts: true },
        remainingAccounts,
        signers,
        instructions: [],
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const withdrawFunds = async (
  anchorWallet: typeof anchor.Wallet,
  fairLaunch: FairLaunchAccount | undefined,
) => {
  if (!fairLaunch) {
    return;
  }

  // TODO: create sequence ticket

  const remainingAccounts = [];

  //@ts-ignore
  if (fairLaunch.state.treasuryMint) {
    remainingAccounts.push({
      //@ts-ignore
      pubkey: fairLaunch.state.treasuryMint,
      isWritable: true,
      isSigner: false,
    });
    remainingAccounts.push({
      pubkey: (
        await getAtaForMint(
          //@ts-ignore
          fairLaunch.state.treasuryMint,
          anchorWallet.publicKey,
        )
      )[0],
      isWritable: true,
      isSigner: false,
    });
    remainingAccounts.push({
      pubkey: TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    });
  }

  await fairLaunch.program.rpc.withdrawFunds({
    accounts: {
      fairLaunch: fairLaunch.id,
      // @ts-ignore
      treasury: fairLaunch.state.treasury,
      authority: anchorWallet.publicKey,
      // @ts-ignore
      tokenMint: fairLaunch.state.tokenMint,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    remainingAccounts,
  });
};