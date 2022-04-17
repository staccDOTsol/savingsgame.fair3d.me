import * as anchor from '@project-serum/anchor';
import { Wallet } from '@strata-foundation/react'
import { sendAndConfirmWithRetry } from '@strata-foundation/spl-utils';
import { getOrCreateAssociatedTokenAccount } from './getOrCreateAssociatedTokenAccont'

import { TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import { AccountMeta, LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  getAtaForMint,
  getFairLaunchTicketSeqLookup,
} from './utils';

export const FAIR_LAUNCH_PROGRAM = new anchor.web3.PublicKey(
  '4SVNgru9G3ANsHmLFyAEv2H8odpNSqawfSscH8kJtKKX',
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
  anchorWallet: any,
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
console.log(state)
 
  const treasury = await program.provider.connection.getBalance(state.treasury);


  return {
    id: fairLaunchId,
    state,
    program,
    treasury,
  };
};

  


const fairLaunchId = new anchor.web3.PublicKey(
  "eXQnsgk89eFSxKwkYLzdhAuWmsuv6PpAeTHiuXsxhtF",
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
  anchorWallet: any,
  fairLaunch: FairLaunchAccount | undefined,
  pubkey: any,
  connection: any
) => {
  if (!fairLaunch) {
    return;
  }

  const [fairLaunchTicket, bump] = await getFairLaunchTicket(
    //@ts-ignore
    fairLaunch.state.treasuryMint,
    anchorWallet.publicKey,
  );

  const remainingAccounts = [];
  const instructions = [];
  const signers = [];

  let amountLamports = 0;
  //@ts-ignore
  if (true) {
    amountLamports = Math.ceil(amount * 10 ** 6);
    const transferAuthority = anchor.web3.Keypair.generate();
    signers.push(transferAuthority);
    // NOTE this token impl will not work till you get decimal mantissa and multiply...
    /// ex from cli wont work since you dont have a Signer, but an anchor.Wallet
    /*
    const token = new Token(
        anchorProgram.provider.connection,
        //@ts-ignore
        fairLaunchObj.treasuryMint,
        TOKEN_PROGRAM_ID,
        walletKeyPair,
      );
      const mintInfo = await token.getMintInfo();
      amountNumber = Math.ceil(amountNumber * 10 ** mintInfo.decimals);
    */
    instructions.push(
      Token.createApproveInstruction(
        TOKEN_PROGRAM_ID,
        //@ts-ignore
        (
          await getAtaForMint(
            //@ts-ignore
            fairLaunch.state.treasuryMint,
            anchorWallet.publicKey,
          )
        )[0],
        transferAuthority.publicKey,
        anchorWallet.publicKey,
        [transferAuthority],
        //@ts-ignore

        // TODO: get mint decimals
        amountLamports,
      ),
    );

    remainingAccounts.push({
      //@ts-ignore
      pubkey: fairLaunch.state.treasuryMint,
      isWritable: true,
      isSigner: false,
    });
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      anchorWallet.publicKey,
      fairLaunch.state.treasuryMint,
      anchorWallet.publicKey,
      anchorWallet.signTransaction
    )
    
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      anchorWallet.publicKey,
      fairLaunch.state.treasuryMint,
      fairLaunch.state.treasury,
      anchorWallet.signTransaction
    )
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
      pubkey: transferAuthority.publicKey,
      isWritable: false,
      isSigner: true,
    });
    remainingAccounts.push({
      pubkey: TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    });
  }

  try {
    console.log('Amount', amountLamports);
    console.log(instructions)
    const provider = new anchor.Provider(connection, anchorWallet, {
      preflightCommitment: 'recent',
    });
  
    const idl = await anchor.Program.fetchIdl(FAIR_LAUNCH_PROGRAM, provider);
    const program2 = new anchor.Program(idl as any, FAIR_LAUNCH_PROGRAM, provider);
    await program2.rpc.purchaseTicket( 
      bump,
      new anchor.BN(amountLamports),
      {
        accounts: {
          tokenMint: fairLaunch.state.tokenMint as PublicKey,
          authority: fairLaunch.state.authority as PublicKey,
          fairLaunch: fairLaunch.id as PublicKey,
          treasury: fairLaunch.state.treasury as PublicKey,
          buyer: anchorWallet.publicKey as PublicKey,
          payer: anchorWallet.publicKey as PublicKey,
          systemProgram: anchor.web3.SystemProgram.programId as PublicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY as PublicKey,
          clock: anchor.web3.SYSVAR_CLOCK_PUBKEY as PublicKey,
        },
        //__private: { logAccounts: true },
       
        remainingAccounts,
      signers: signers,
        instructions: instructions//instructions.length > 0 ? instructions : undefined,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const withdrawFunds = async (
  anchorWallet: any,
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
    } as AccountMeta);
    remainingAccounts.push({
      pubkey: (
        await getAtaForMint(
          //@ts-ignore
          fairLaunch.state.treasuryMint,
          anchorWallet.publicKey,
        )
      )[0] as PublicKey,
      isWritable: true,
      isSigner: false,
    } as AccountMeta);
    remainingAccounts.push({
      pubkey: TOKEN_PROGRAM_ID as PublicKey,
      isWritable: false,
      isSigner: false,
    } as AccountMeta);
  }

  await fairLaunch.program.rpc.withdrawFunds({
    accounts: {
      fairLaunch: fairLaunch.id,
      // @ts-ignore
      treasury: fairLaunch.state.treasury,
      authority: anchorWallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    remainingAccounts,
  });
};