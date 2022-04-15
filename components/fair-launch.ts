import * as anchor from '@project-serum/anchor';
import { Wallet } from '@strata-foundation/react'
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
  anchorWallet: any,
  fairLaunchId: anchor.web3.PublicKey,
  connection: anchor.web3.Connection,
): Promise<FairLaunchAccount> => {
  const provider = new anchor.Provider(connection, anchorWallet, {
    preflightCommitment: 'recent',
  });

  const idl ={
    "version": "0.1.0",
    "name": "fair_launch",
    "instructions": [
      {
        "name": "initializeFairLaunch",
        "accounts": [
          {
            "name": "fairLaunch",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "payer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "treasuryBump",
            "type": "u8"
          },
          {
            "name": "tokenMintBump",
            "type": "u8"
          },
          {
            "name": "data",
            "type": {
              "defined": "FairLaunchData"
            }
          }
        ]
      },
      {
        "name": "purchaseTicket",
        "accounts": [
          {
            "name": "fairLaunch",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "buyer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "payer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "clock",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "withdrawFunds",
        "accounts": [
          {
            "name": "fairLaunch",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "clock",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tokenMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "FairLaunch",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "tokenMint",
              "type": "publicKey"
            },
            {
              "name": "treasury",
              "type": "publicKey"
            },
            {
              "name": "treasuryMint",
              "type": {
                "option": "publicKey"
              }
            },
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "treasuryBump",
              "type": "u8"
            },
            {
              "name": "tokenMintBump",
              "type": "u8"
            },
            {
              "name": "data",
              "type": {
                "defined": "FairLaunchData"
              }
            },
            {
              "name": "numberTicketsUnSeqed",
              "type": "u64"
            },
            {
              "name": "numberTicketsSold",
              "type": "u64"
            },
            {
              "name": "numberTicketsDropped",
              "type": "u64"
            },
            {
              "name": "numberTicketsPunched",
              "type": "u64"
            },
            {
              "name": "numberTokensBurnedForRefunds",
              "type": "u64"
            },
            {
              "name": "numberTokensPreminted",
              "type": "u64"
            },
            {
              "name": "phaseThreeStarted",
              "type": "bool"
            },
            {
              "name": "treasurySnapshot",
              "type": {
                "option": "u64"
              }
            },
            {
              "name": "currentEligibleHolders",
              "type": "u64"
            },
            {
              "name": "currentMedian",
              "type": "u64"
            },
            {
              "name": "countsAtEachTick",
              "type": {
                "vec": "u64"
              }
            },
            {
              "name": "participationModulo",
              "type": "u8"
            },
            {
              "name": "participationMintBump",
              "type": "u8"
            },
            {
              "name": "participationTokenBump",
              "type": "u8"
            },
            {
              "name": "participationMint",
              "type": {
                "option": "publicKey"
              }
            }
          ]
        }
      },
      {
        "name": "FairLaunchLotteryBitmap",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "fairLaunch",
              "type": "publicKey"
            },
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "bitmapOnes",
              "type": "u64"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "Creator",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "address",
              "type": "publicKey"
            },
            {
              "name": "verified",
              "type": "bool"
            },
            {
              "name": "share",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "TokenMetadata",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "symbol",
              "type": "string"
            },
            {
              "name": "uri",
              "type": "string"
            },
            {
              "name": "sellerFeeBasisPoints",
              "type": "u16"
            },
            {
              "name": "creators",
              "type": {
                "option": {
                  "vec": {
                    "defined": "Creator"
                  }
                }
              }
            },
            {
              "name": "isMutable",
              "type": "bool"
            }
          ]
        }
      },
      {
        "name": "AntiRugSetting",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "reserveBp",
              "type": "u16"
            },
            {
              "name": "tokenRequirement",
              "type": "u64"
            },
            {
              "name": "selfDestructDate",
              "type": "i64"
            }
          ]
        }
      },
      {
        "name": "FairLaunchData",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "last",
              "type": "u64"
            },
            {
              "name": "uuid",
              "type": "string"
            },
            {
              "name": "priceRangeStart",
              "type": "u64"
            },
            {
              "name": "priceRangeEnd",
              "type": "u64"
            },
            {
              "name": "phaseOneStart",
              "type": "i64"
            },
            {
              "name": "phaseOneEnd",
              "type": "i64"
            },
            {
              "name": "phaseTwoEnd",
              "type": "i64"
            },
            {
              "name": "lotteryDuration",
              "type": "i64"
            },
            {
              "name": "tickSize",
              "type": "u64"
            },
            {
              "name": "numberOfTokens",
              "type": "u64"
            },
            {
              "name": "fee",
              "type": "u64"
            },
            {
              "name": "antiRugSetting",
              "type": {
                "option": {
                  "defined": "AntiRugSetting"
                }
              }
            }
          ]
        }
      },
      {
        "name": "FairLaunchTicketState",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "NoSequenceStruct"
            },
            {
              "name": "Unpunched"
            },
            {
              "name": "Punched"
            },
            {
              "name": "Withdrawn"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "IncorrectOwner",
        "msg": "Account does not have correct owner!"
      },
      {
        "code": 6001,
        "name": "Uninitialized",
        "msg": "Account is not initialized!"
      },
      {
        "code": 6002,
        "name": "MintMismatch",
        "msg": "Mint Mismatch!"
      },
      {
        "code": 6003,
        "name": "TokenTransferFailed",
        "msg": "Token transfer failed"
      },
      {
        "code": 6004,
        "name": "NumericalOverflowError",
        "msg": "Numerical overflow error"
      },
      {
        "code": 6005,
        "name": "TimestampsDontLineUp",
        "msg": "Timestamps of phases should line up"
      },
      {
        "code": 6006,
        "name": "CantSetPhaseThreeDatesYet",
        "msg": "Cant set phase 3 dates yet"
      },
      {
        "code": 6007,
        "name": "UuidMustBeExactly6Length",
        "msg": "Uuid must be exactly of 6 length"
      },
      {
        "code": 6008,
        "name": "TickSizeTooSmall",
        "msg": "Tick size too small"
      },
      {
        "code": 6009,
        "name": "CannotGiveZeroTokens",
        "msg": "Cannot give zero tokens"
      },
      {
        "code": 6010,
        "name": "InvalidPriceRanges",
        "msg": "Invalid price ranges"
      },
      {
        "code": 6011,
        "name": "TooMuchGranularityInRange",
        "msg": "With this tick size and price range, you will have too many ticks(>"
      },
      {
        "code": 6012,
        "name": "CannotUseTickSizeThatGivesRemainder",
        "msg": "Cannot use a tick size with a price range that results in a remainder when doing (end-start)/ticksize"
      },
      {
        "code": 6013,
        "name": "DerivedKeyInvalid",
        "msg": "Derived key invalid"
      },
      {
        "code": 6014,
        "name": "TreasuryAlreadyExists",
        "msg": "Treasury Already Exists"
      },
      {
        "code": 6015,
        "name": "LotteryBitmapOnesMustEqualNumberOfTicketsSold",
        "msg": "The number of ones in the lottery must equal the number of tickets sold in phase 1"
      },
      {
        "code": 6016,
        "name": "InvalidPurchaseAmount",
        "msg": "Amount must be between price ranges and at a tick mark"
      },
      {
        "code": 6017,
        "name": "TreasuryMintMismatch",
        "msg": "Treasury mint does not match"
      },
      {
        "code": 6018,
        "name": "NotEnoughTokens",
        "msg": "Not enough tokens to pay for this minting"
      },
      {
        "code": 6019,
        "name": "NotEnoughSOL",
        "msg": "Not enough SOL to pay for this minting"
      },
      {
        "code": 6020,
        "name": "InvalidTokenProgram",
        "msg": "Sent up invalid token program"
      },
      {
        "code": 6021,
        "name": "CannotBuyTicketsOutsidePhaseOne",
        "msg": "Cannot buy tickets outside phase one"
      },
      {
        "code": 6022,
        "name": "CannotCreateFairLaunchLotteryBitmapBeforePhaseTwoEnd",
        "msg": "Cannot create the bitmap before phase two end"
      },
      {
        "code": 6023,
        "name": "CannotUpdateFairLaunchLotteryOncePhaseThreeLocked",
        "msg": "Cannot update fair launch lottery once phase three locked"
      },
      {
        "code": 6024,
        "name": "SeqAlreadyExists",
        "msg": "Seq already exists"
      },
      {
        "code": 6025,
        "name": "CannotSetFairLaunchLotteryUntilAllTicketsAreSequenced",
        "msg": "Cannot set lottery until all tickets have sequence lookups using permissionless crank endpoint. Use CLI to make."
      },
      {
        "code": 6026,
        "name": "CanOnlySubmitZeroDuringPhaseThree",
        "msg": "During phase three, since you did not pay up to the median, you can only withdraw your funds"
      },
      {
        "code": 6027,
        "name": "CanOnlySubmitDifferenceDuringPhaseThree",
        "msg": "During phase three, since you paid above median, you can only withdraw the difference"
      },
      {
        "code": 6028,
        "name": "DidNotWinLotteryCanOnlyWithdraw",
        "msg": "You did not win the lottery, therefore you can only withdraw your funds"
      },
      {
        "code": 6029,
        "name": "AccountShouldHaveNoDelegates",
        "msg": "This account should have no delegates"
      },
      {
        "code": 6030,
        "name": "TokenMintToFailed",
        "msg": "Token minting failed"
      },
      {
        "code": 6031,
        "name": "DuringPhaseTwoAndOneBuyerMustBeSigner",
        "msg": "During phase two and one buyer must be signer"
      },
      {
        "code": 6032,
        "name": "InvalidFairLaunchTicketState",
        "msg": "Invalid fair launch ticket state for this operation"
      },
      {
        "code": 6033,
        "name": "CannotCashOutUntilAllRefundsAndPunchesHaveBeenProcessed",
        "msg": "Cannot cash out until all refunds and punches (permissionless calls) have been processed. Use the CLI."
      },
      {
        "code": 6034,
        "name": "CannotCashOutUntilPhaseThree",
        "msg": "Cannot cash out until phase three"
      },
      {
        "code": 6035,
        "name": "CannotUpdateFairLaunchDataOnceInProgress",
        "msg": "Cannot update fair launch variables once it is in progress"
      },
      {
        "code": 6036,
        "name": "PhaseTwoEnded",
        "msg": "Not able to adjust tickets between phase two and three"
      },
      {
        "code": 6037,
        "name": "CannotPunchTicketWhenHavingPaidLessThanMedian",
        "msg": "Cannot punch ticket when having paid less than median."
      },
      {
        "code": 6038,
        "name": "AlreadyWithdrawnCapitalAlotment",
        "msg": "You have already withdrawn your seed capital alotment from the treasury."
      },
      {
        "code": 6039,
        "name": "NoAntiRugSetting",
        "msg": "No anti rug settings on this fair launch. Should've checked twice."
      },
      {
        "code": 6040,
        "name": "SelfDestructNotPassed",
        "msg": "Self destruct date has not passed yet, so you are not eligible for a refund."
      },
      {
        "code": 6041,
        "name": "TokenBurnFailed",
        "msg": "Token burn failed"
      },
      {
        "code": 6042,
        "name": "NoTreasurySnapshot",
        "msg": "No treasury snapshot present"
      },
      {
        "code": 6043,
        "name": "CannotRefundUntilAllTicketsHaveBeenPunchedOrDropped",
        "msg": "Cannot refund until all existing tickets have been dropped or punched"
      },
      {
        "code": 6044,
        "name": "CannotRefundUntilPhaseThree",
        "msg": "Cannot refund until phase three"
      },
      {
        "code": 6045,
        "name": "InvalidReserveBp",
        "msg": "Invalid reserve bp"
      },
      {
        "code": 6046,
        "name": "InvalidAntiRugTokenRequirement",
        "msg": "Anti Rug Token Requirement must be less than or equal to number of tokens being sold"
      },
      {
        "code": 6047,
        "name": "CannotPunchTicketUntilPhaseThree",
        "msg": "Cannot punch ticket until phase three"
      },
      {
        "code": 6048,
        "name": "CannotPunchTicketUntilEqualized",
        "msg": "Cannot punch ticket until you have refunded the difference between your given price and the median."
      },
      {
        "code": 6049,
        "name": "InvalidLotteryDuration",
        "msg": "Invalid lottery duration"
      },
      {
        "code": 6050,
        "name": "PhaseThreeAlreadyStarted",
        "msg": "Phase two already started"
      },
      {
        "code": 6051,
        "name": "PhaseTwoHasntEndedYet",
        "msg": "Phase two hasnt ended yet"
      },
      {
        "code": 6052,
        "name": "LotteryDurationHasntEndedYet",
        "msg": "Lottery duration hasnt ended yet"
      },
      {
        "code": 6053,
        "name": "FairLaunchMismatch",
        "msg": "Fair launch ticket and fair launch key mismatch"
      },
      {
        "code": 6054,
        "name": "ParticipationTokenAccountAlreadyExists",
        "msg": "Participation Token Account already exists"
      },
      {
        "code": 6055,
        "name": "InvalidParticipationModulo",
        "msg": "Invalid participation modulo"
      },
      {
        "code": 6056,
        "name": "AlreadyMintedParticipation",
        "msg": "Already got participation"
      },
      {
        "code": 6057,
        "name": "NotEligibleForParticipation",
        "msg": "Not eligible for participation"
      },
      {
        "code": 6058,
        "name": "ParticipationMintMismatch",
        "msg": "The mint on this account does not match the participation nft mint"
      },
      {
        "code": 6059,
        "name": "AccountOwnerShouldBeBuyer",
        "msg": "Account owner should be buyer"
      },
      {
        "code": 6060,
        "name": "AccountOwnerShouldBeAuthority",
        "msg": "Account owner should be fair launch authority"
      },
      {
        "code": 6061,
        "name": "TokenMintMismatch",
        "msg": "Token mint mismatch"
      },
      {
        "code": 6062,
        "name": "CannotMintMoreTokensThanTotal",
        "msg": "Cannot mint more tokens than are allowed by the fair launch"
      },
      {
        "code": 6063,
        "name": "CanOnlyPremintOnce",
        "msg": "Due to concerns that you might mint, burn, then mint again and mess up the counter, you can only mint once before the FLP"
      },
      {
        "code": 6064,
        "name": "CannotMintTokensUntilAllCashedOut",
        "msg": "Once phase three has begun, no more FLP tokens can be minted until all ticket holders have been given tokens"
      }
    ],
    "metadata": {
      "address": "knGjLrbC9CBfMmfUzPkBM5ceXUNar2Ape13ZvkuXGzW"
    }
  }// await anchor.Program.fetchIdl(FAIR_LAUNCH_PROGRAM, provider);
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

const getSetupForTicketing = async (
  anchorProgram: anchor.Program,
  amount: number,
  anchorWallet: any,
  fairLaunch: FairLaunchAccount | undefined,
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
  
  if (!fairLaunch) {
    return {
      remainingAccounts: [],
      instructions: [],
      signers: [],
      amountLamports: 0,
    };
  }
  const remainingAccounts = [];
  const instructions = [];
  const signers = [];

  let amountLamports = 0;
  //@ts-ignore
  if (!fairLaunch.state.treasuryMint) {
    console.log(1)
   
      amountLamports = Math.ceil(amount * LAMPORTS_PER_SOL);
    
  } else {
    console.log(2)
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
        fairLaunch.state.treasuryMint,
        transferAuthority.publicKey,
        anchorWallet.publicKey,
        [],
        //@ts-ignore

        // TODO: get mint decimals
        amountNumber + fairLaunch.state.data.fees.toNumber(),
      ),
    );

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

  return {
    remainingAccounts,
    instructions,
    signers,
    amountLamports,
  };
};

export const receiveRefund = async (
  anchorWallet: any,
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
  "3e4X7HFK7nVycvoKc3SgHMj5XtYndEQNAtwv6KtJEfSz",
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
  fairLaunch: FairLaunchAccount ,
  pubkey: anchor.web3.PublicKey,

) => {
  if (!fairLaunch) {
    return;
  }

  const [fairLaunchTicket, bump] = await getFairLaunchTicket(
    //@ts-ignore
    fairLaunch.state.tokenMint,
    anchorWallet.publicKey,
  );

  const { remainingAccounts, instructions, signers, amountLamports } =
    await getSetupForTicketing(
      fairLaunch.program,
      amount,
      anchorWallet,
      fairLaunch,
    );
console.log(instructions)
  try {
    console.log('Amount', amountLamports);
    await fairLaunch.program.rpc.purchaseTicket(
      bump,
      new anchor.BN(amountLamports),
      {
        accounts: {
          fairLaunch: fairLaunch.id,
          treasury: fairLaunch.state.treasury,
          payer: pubkey,
          buyer: pubkey,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        },
        //__private: { logAccounts: true },
        remainingAccounts: [],
        signers: [],
        instructions: []
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