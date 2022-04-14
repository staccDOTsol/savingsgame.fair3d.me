import {FanoutClient} from "@glasseaters/hydra-sdk";
import {
  BondingPricing,
  ITokenBonding,
  SplTokenBonding,
} from "@strata-foundation/spl-token-bonding";
import { Countdown } from "../components/Countdown";

import { PublicKey, Connection } from '@solana/web3.js'
import { useState, useMemo, useEffect } from "react";
import { formatNumber, getAtaForMint, toDate } from '../components/utils';
import * as anchor from '@project-serum/anchor';
import { useLivePrice } from "../components/ussLivePrice";
import { useBondingPricing } from "@strata-foundation/react";

import { useStrataSdks } from "@strata-foundation/react";
import {
  FairLaunchAccount,
  getFairLaunchState,
  purchaseTicket,
} from '../components/fair-launch';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Input, Button, Slider
} from 'antd';

import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Swap } from '@strata-foundation/react'
import { CreateButton, ITokenState } from '../components/CreateButton';
import { TokenDisplay } from '../components/TokenDisplay';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      foo: "bar"
    }
  }
}
const Home: NextPage = ({ foo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

let first = true

  const [tokenState, setTokenState] = React.useState<ITokenState>({});
const wallet = useWallet()

var tokenBondingKey = new PublicKey("3nN2iNpJcgurQxN2V6P7TQMiSCQw3ENPeqqwfZ2pxpTT")
var baseBondingKey = new PublicKey("TUuz8CZC8N5Nekt6WnQx5mt4xY7hMjPg3r34UzigUtB")
const { tokenBondingSdk, loading } = useStrataSdks();
const getPricing = async (
  tokenBondingSdk: SplTokenBonding | undefined,
  key: PublicKey | null | undefined,

) => tokenBondingSdk && key && tokenBondingSdk.getPricing(key);

const [contributed, setContributed] = useState(0);

const [basePrice, setBasePrice] = useState<number >(1);
const [targetPrice, setTargetPrice] = useState<number >(1);
if (first){
  setTimeout(async function(){
setInterval(async function(){
  if (!loading && tokenBondingSdk){

    var pricing = await tokenBondingSdk.getPricing(tokenBondingKey);
    var pricing2 = await tokenBondingSdk.getPricing(baseBondingKey);
    if (pricing && pricing2 && fairLaunch){
      // @ts-ignore
      var amountPerOneSol = pricing2.buyWithBaseAmount( (formatNumber.asNumber(fairLaunch?.state.data.last)) + 0.0138);
      if (amountPerOneSol){
    var currentBuyPriceSol = pricing.buyWithBaseAmount(amountPerOneSol);

    // @ts-ignore
    //alert(price) 0.22
    //alert(price2)0.04 0.28
    // @ts-ignore

    // @ts-ignore
    setMin2((  amountPerOneSol ))
    setMin((  currentBuyPriceSol ))
      }
  }
  }
}, 1000)
  }, 5000)
first = false }
const [fairLaunch, setFairLaunch] = useState<FairLaunchAccount>();

const [alertState, setAlertState] = useState<AlertState>({
  open: false,
  message: '',
  severity: undefined,
});
const anchorWallet = useMemo(() => {
  if (
    !wallet ||
    !wallet.publicKey ||
    !wallet.signAllTransactions ||
    !wallet.signTransaction
  ) {
    return;
  }
// @ts-ignore
  return {
    publicKey: wallet.publicKey,
    signAllTransactions: wallet.signAllTransactions,
    signTransaction: wallet.signTransaction,
  } as typeof anchor.Wallet;
}, [wallet]);


var [shares, setShares] = useState("1.38");
const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

async function onChange(e: any){
  e.preventDefault()
  console.log(e.target.value)
  setShares(e.target.value)
}
  var mintPublicKey2 =new PublicKey("5NhF3kUzzuVuuYooJoJjZNQtzjPNdGfGdfUL4dojL7UL")  
  var mintPublicKey = new PublicKey("DwyrS41AcCcfjRXeCMnGHtkr84Yij6VCzhac5pJM9Ejm")

    var connection2 = new Connection('https://solana--devnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2', "confirmed");
  //var wallet = useAnchorWallet()
 
const fairLaunchId = new anchor.web3.PublicKey(
  "3e4X7HFK7nVycvoKc3SgHMj5XtYndEQNAtwv6KtJEfSz",
);
setInterval(async function(){    (async () => {
      if (!anchorWallet) {
        return;
      }

      try {
       
      //  setYourSOLBalance(balance);

        const state = await getFairLaunchState(
          anchorWallet,
          fairLaunchId,
          connection2,
        );

        setFairLaunch(state);


      } catch (e) {
        
      }
    })();
    }, 5000)
  var  max, fee, step, median;
  const [ min2 , setMin2 ] = useState<number>()
  const [ min , setMin ] = useState<number>()
let tf = true
  if (min == 1 && fairLaunch && tf){
    tf = false
    // @ts-ignore
//setMin( (formatNumber.asNumber(fairLaunch?.state.data.last)) + 0.0138)
  }
var phaseOneEnd =  toDate(fairLaunch?.state.data.phaseOneEnd)?.getTime();
console.log(fairLaunch?.state)

const ValueSlider = (Slider)

// @ts-ignore

  console.log(min)
  // @ts-ignore
  var fee = formatNumber.asNumber(fairLaunch?.state.data.fee);
  // @ts-ignore
  //var max = min + (0.0138 * 1);
  // @ts-ignore
  var step = 0.0138;
  // @ts-ignore
  var median = formatNumber.asNumber(fairLaunch?.state.currentMedian);
 
  const onDeposit = async () => {
    /*
await swap({
          baseMint: baseMint!,
          targetMint: targetMint!,
          ...outputAmountSetting,
          slippage: +values.slippage / 100,
          ticker: target!.ticker,
        });
    */
    if (!anchorWallet) {
      return;
    }
    setIsMinting(true)

   if (!loading && tokenBondingSdk && min && min2){
    await tokenBondingSdk.sell({
      tokenBonding: tokenBondingKey,
      targetAmount: min,
      slippage: 0.80
    })
    await tokenBondingSdk.sell({
      tokenBonding: baseBondingKey,
      targetAmount: min2,
      slippage: 0.80
    })
      console.log('deposit');
    setIsMinting(true);
    try {

    
     // @ts-ignore
      await purchaseTicket( ((formatNumber.asNumber(fairLaunch?.state.data.last)) + 0.0138), anchorWallet, fairLaunch);
      setIsMinting(false);
      setAlertState({
        open: true,
        message: 'Congratulations! contribution mewn nfa',
        severity: 'success',
      });
    } catch (e) {
      console.log(e);
      setIsMinting(false);
      setAlertState({
        open: true,
        message: 'Something went wrong.',
        severity: 'error',
      });
    }
  }
  };
  async function claim(){
    if (wallet){    var fanoutSdk: FanoutClient;
      fanoutSdk = new FanoutClient(
        connection2  ,
        // @ts-ignore
        wallet
    );
    var fanout = new PublicKey("8QPuyqUQuZANiiB5H3Rx2tLny4zVmpMANFVseoAm4fFh")
   
  var ix = await fanoutSdk.distributeTokenMemberInstructions(
    {
      
      distributeForMint: true,
      fanout: fanout,
      fanoutMint: mintPublicKey,
      membershipMint: mintPublicKey,
     // @ts-ignore
      member: wallet.publicKey,
      // @ts-ignore
      payer: wallet.publicKey

    }
  );

var ix3= await fanoutSdk.distributeTokenMemberInstructions(
  {
  
       
    distributeForMint: true,
    fanout: fanout,
    fanoutMint: mintPublicKey2,
    membershipMint: mintPublicKey,
   // @ts-ignore
    member: wallet.publicKey,
    // @ts-ignore
    payer: wallet.publicKey

  }
); 
var  tx2 = await fanoutSdk.sendInstructions(
 [...ix.instructions,...ix3.instructions],
  // [...ix.instructions, ...ix3.instructions],
  [],
  // @ts-ignore
  wallet.publicKey
);
  }
}
  async function doit(){

  if (wallet){

    var fanoutSdk: FanoutClient;
    fanoutSdk = new FanoutClient(
      connection2,
      // @ts-ignore
      wallet
  );
  var fanout = new PublicKey("8QPuyqUQuZANiiB5H3Rx2tLny4zVmpMANFVseoAm4fFh")
  console.log( (parseFloat(shares) * 10 ** 9))
var  ixs = await fanoutSdk.stakeTokenMemberInstructions(
        {
            
            shares:  (parseFloat(shares) * 10 ** 9),
            fanout: fanout,
            membershipMint: mintPublicKey,
           // @ts-ignore
            member: wallet.publicKey,
            // @ts-ignore
            payer: wallet.publicKey
        }
    );var tx = await fanoutSdk.sendInstructions(
      ixs.instructions,
      [],
      // @ts-ignore
      wallet.publicKey
  );

}
  }

/*
  console.log(321)
  const { info: tokenBonding2 } = useTokenBondingFromMint(mintPublicKey);
  const { price: price2, loading: l2 } = useLivePrice(tokenBonding2?.publicKey);
  if (price2){
    if (!l2 && !isNaN(price2)){
   // console.log(price2)
    }
  }
  */
  async function us(){

    if (wallet){
      var fanoutSdk: FanoutClient;
      fanoutSdk = new FanoutClient(
        connection2,
        // @ts-ignore
        wallet
    );
    var fanout = new PublicKey("8QPuyqUQuZANiiB5H3Rx2tLny4zVmpMANFVseoAm4fFh")
    
    await fanoutSdk.unstakeTokenMember({
      fanout: fanout,
      // @ts-ignore
      member: wallet.publicKey,
      // @ts-ignore
      payer: wallet.publicKey
  }
  );
    }

  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Fair3d.me - the game&apos;s in the meta</title>
        <meta name="description" content="Generated for a cool (2nd...) one-off demonstration to illustrate the power of Hydra, who is King." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
    <br />  1. there is a social token
    <br />2. every time someone buys or sells the social token, there are 5% fees of sol amount and 5% fees of token amount
    <br />3. these fees go into a big fanout wallet
    <br />4. the recipients of the fees are staked tokenholders
    <br />5. you go to the site
    <br />6. there is a countdown clock, and if you deposit more $ than the last guy and nobody else deposits in the next 24hs than u win
    <br />7. it is an english style auction and there is 1 winner :) glhf :)
    <br />
    <br />
    <div>Ayyy</div>
    {!loading && tokenBondingSdk && 
  <Swap tokenBondingKey={tokenBondingKey} />
}
  Shares: 
<br />
      <Input  style={{color:"black", fontSize: "30px;", backgroundColor: "grey"}} type="text" onInput={onChange} value={shares} />
<br />
<br />
      <Button style={{color:"purple"}}  onClick={doit} >STAKEme</Button>
<br />
      <Button style={{color:"purple"}} onClick={us} >UNSTAKEALLme</Button>
<br />
      <Button style={{color:"purple"}} onClick={claim} >meCLAIM</Button>
<br />
<br />
<br />
          
              {!wallet.connected ? (
              <div></div>
            ) : ( 
              <div>

<div style={{fontSize: "32px;"}}>                winner takes all {
                // @ts-ignore
              (fairLaunch?.treasury / 1000000000)} SOL! </div>
                    <Button
                      onClick={onDeposit}
                      disabled={
                        false 
                      }
                    >
                      {isMinting ? (
                        'loadin'
                      ): (
                        'YGMI @ ' + (min || 0 + (0.0138 * 1)).toString() + ' toks (CLICK ME I AM A BUTTON), or else ' + fairLaunch?.state.authority.toBase58().slice(0, 3) +
                          '...' +
                          fairLaunch?.state.authority
                            .toBase58()
                            .slice(
                              fairLaunch?.state.authority.toBase58().length - 3,
                              fairLaunch?.state.authority.toBase58().length,
                            ) + ' does! This address wins ;)'
                      
                            )
                     }
                      {}
                    </Button>
                    Competition ends:  <Countdown date={new Date(phaseOneEnd as number)} />
                  </div>
                 )}

      </main>
    </div>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}
export default Home;
