import {
  BondingPricing,
  ITokenBonding,
  SplTokenBonding,
} from "@strata-foundation/spl-token-bonding";
import { Account } from "@solana/web3.js";
import { Wallet } from "@project-serum/anchor";
import { LbcStatus } from "../components/LbcStatus";
import { Branding } from "../components/Branding";
import { purchaseTicket } from "../components/fair-launch";
import { LbcInfo } from "../components/LbcInfo";
import { TokenOffering } from "../components/TokenOffering"
import { numberWithCommas } from "../utils/numberWithCommas";
import { FAIR_LAUNCH_PROGRAM } from "../components/fair-launch";
import {Keypair, LAMPORTS_PER_SOL} from "@solana/web3.js";
import {ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {
    Fanout,
    FanoutClient,
    FanoutMembershipMintVoucher,
    FanoutMembershipVoucher,
    FanoutMint,
    MembershipModel
} from "@glasseaters/hydra-sdk";


import {
  Box,
  Center,
  Container,
  DarkMode,
  Heading,
  Text,
  BoxProps,
  TextProps,
  Spinner,
  useColorModeValue,
  VStack,
  Stack,
} from "@chakra-ui/react";
import {
  usePublicKey,
  useTokenBondingFromMint,
} from "@strata-foundation/react";

import { useRouter } from "next/router";


import { PublicKey, Connection } from '@solana/web3.js'
import { useState, useMemo, useEffect } from "react";
import { formatNumber, getAtaForMint, toDate } from '../components/utils';
import * as anchor from '@project-serum/anchor';
import { useLivePrice } from "../hooks/useLivePrice";
import { useBondingPricing } from "@strata-foundation/react";

import { useStrataSdks } from "@strata-foundation/react";
import {
  FairLaunchAccount,
  getFairLaunchState,
  getFairLaunchTicket,
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
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

let first = true
let first2 = true
let f123 = true
let firstlala = true
var publicKey
export const LbcDisplay: NextPage = ({
  name,
  image,
  description,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  var { publicKey } = useWallet();

  const [members, setMembers] = React.useState<number>();
  const [staked, setStaked] = React.useState<number>();
  const [total, setTotal] = React.useState<number>();
const [tokenState, setTokenState] = React.useState<ITokenState>({});
const wallet = useWallet()\

if (firstlala){
  firstlala=false
setTimeout(async function(){
    if (anchorWallet){
  var connection2 = new Connection('https://ssc-dao.genesysgo.net/', "confirmed");

const fanoutSdk = new FanoutClient(
  connection2,
  anchorWallet
);
const fanoutAccount = await fanoutSdk.fetch<Fanout>(
  fanout as PublicKey,
  
  Fanout
)
console.log(fanoutAccount)
setTotal((formatNumber.asNumber(new anchor.BN(fanoutAccount?.totalShares))))
// @ts-ignore
  setStaked((formatNumber.asNumber(new anchor.BN(fanoutAccount?.totalStakedShares))))
  // @ts-ignore
  setMembers(((new anchor.BN(fanoutAccount?.totalMembers))))
    }
}, 500)

setInterval(async function(){
  if (anchorWallet){
    var connection2 = new Connection('https://ssc-dao.genesysgo.net/', "confirmed");
  
  const fanoutSdk = new FanoutClient(
    connection2,
    anchorWallet
  );
  const fanoutAccount = await fanoutSdk.fetch<Fanout>(
    fanout as PublicKey,
    
    Fanout
  )
  console.log(fanoutAccount)
  setTotal((formatNumber.asNumber(new anchor.BN(fanoutAccount?.totalShares))))
  // @ts-ignore
    setStaked((formatNumber.asNumber(new anchor.BN(fanoutAccount?.totalStakedShares))))
    // @ts-ignore
    setMembers(((new anchor.BN(fanoutAccount?.totalMembers))))
      }
}, 5500)
}
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
  } as  anchor.Wallet;
}, [wallet]);

var mintPublicKey2 =usePublicKey("openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79")  
var mintPublicKey = usePublicKey("Bw4DFkpEXojT93uTLqjdWetVUMQcKJKv9evQJ3GVSJGp")


var tokenBondingKey = usePublicKey("5gmtthiFuBA59c4ZWr8vfR8PtdH3DNpQruDBMg7nrL8B")
var baseBondingKey =  usePublicKey("9Zse7YX2mPQFoyMuz2Gk2K8WcH83FY1BLfu34vN4sdHi")
const { tokenBondingSdk, loading } = useStrataSdks();
const getPricing = async (
tokenBondingSdk: SplTokenBonding | undefined,
key: PublicKey | null | undefined,

) => tokenBondingSdk && key && tokenBondingSdk.getPricing(key);

const [contributed, setContributed] = useState(0);

const [basePrice, setBasePrice] = useState<number >(1);
const [targetPrice, setTargetPrice] = useState<number >(1);
setInterval(async function(){
  if (tokenBondingSdk){

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

}, 540)
if (first){
  first = false 

 
setTimeout(async function(){
  if (tokenBondingSdk && !min && !min2){

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
    if (!min2){
      setMin2((  amountPerOneSol ))
      }
      if (!min){
      setMin((  currentBuyPriceSol ))
      }
      }
  }
  }
  
}, 1500)

}


const [fairLaunch, setFairLaunch] = useState<FairLaunchAccount>();

const [alertState, setAlertState] = useState<AlertState>({
open: false,
message: '',
severity: undefined,
});

const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  var connection2 = new Connection('https://ssc-dao.genesysgo.net/', "confirmed");

const fairLaunchId = usePublicKey(
"6A5bT4dQ7VbN1G88WNM3oAKoDMQ3CmYSTjPXSCikHCWy",
);
if (first2 && SplTokenBonding){
  first2=  false
   
setInterval(async function(){    (async () => {
  if (f123){
  try {
   
  //  setYourSOLBalance(balance);

    const state = await getFairLaunchState(
      // @ts-ignore
      anchorWallet,
      // @ts-ignore
      fairLaunchId,
      connection2,
    );
if (!fairLaunch){
    setFairLaunch(state);
}
    console.log(fairLaunch?.state)

  } catch (e) {
    
  }
}
})(); 

}, 2550)
setTimeout(async function(){    (async () => {
  if (f123){
    f123 = false
  try {
   
  //  setYourSOLBalance(balance);

    const state = await getFairLaunchState(
      // @ts-ignore
      anchorWallet,
      // @ts-ignore
      fairLaunchId,
      connection2,
    );

    if (!fairLaunch){
      setFairLaunch(state);
  }
    console.log(fairLaunch?.state)

  } catch (e) {
    
  }
}
})(); 

}, 250)

}

var  max, fee, step, median;
const [ min2 , setMin2 ] = useState<number>()
const [ min , setMin ] = useState<number>()
let tf = true
if (min == 1 && fairLaunch && tf){
  tf = false
  if (tokenBondingSdk){
setTimeout(async function(){
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

  }, 250)
 
  }
  // @ts-ignore
//setMin( (formatNumber.asNumber(fairLaunch?.state.data.last)) + 0.0138)
}
var phaseOneEnd =  toDate(fairLaunch?.state.data.phaseOneEnd)?.getTime();

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
  setIsMinting(true);

  await tokenBondingSdk.sell({
    // @ts-ignore
    tokenBonding: tokenBondingKey,
    targetAmount: min * 1.2,
    slippage: 0.80
  })
  await tokenBondingSdk.sell({
    // @ts-ignore
    tokenBonding: baseBondingKey,
    targetAmount: min2 * 0.94,
    slippage: 0.80
  }) 
    console.log('deposit'); 
    const provider = new anchor.Provider(connection2, anchorWallet, {
      preflightCommitment: 'recent',
    });
  
    const idl = await anchor.Program.fetchIdl(FAIR_LAUNCH_PROGRAM, provider);
  // @ts-ignore
    const program = new anchor.Program(idl, FAIR_LAUNCH_PROGRAM, provider);
    // @ts-ignore
    const state: any = await program.account.fairLaunch.fetch(fairLaunchId);
    console.log(1)
  console.log(state)
   
    const treasury = await program.provider.connection.getBalance(state.treasury);
  
    // @ts-ignore
    await purchaseTicket( ((formatNumber.asNumber(fairLaunch?.state.data.last)) + 0.0138), wallet, fairLaunch, wallet.publicKey, program);
     
    setIsMinting(false);
    setAlertState({
      open: true,
      message: 'Congratulations! contribution mewn nfa',
      severity: 'success',
    });}
};
const BlackBox = ({ children, ...other }: BoxProps) => {
  return (
    <Center
      p="26px"
      rounded="lg"
      backgroundColor={useColorModeValue("gray.200", "black.500")}
      {...other}
    >
      {children}
    </Center>
  );
};

const BigText = ({ children, ...other }: TextProps) => {
  return (
    <Text fontWeight={700} fontSize="24px" {...other}>
      {children}
    </Text>
  );
};
var mintPublicKey2 =usePublicKey("openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79")  
var mintPublicKey = usePublicKey("Bw4DFkpEXojT93uTLqjdWetVUMQcKJKv9evQJ3GVSJGp")
var fanout = usePublicKey("5dNo3SrhR3FhY4aqSsaZNeZ3XfvAnQxtY98QKuGvZzgN")
   
  return (
    
    <Box
      color={useColorModeValue("black", "white")}
      w="full"
      backgroundColor="black.500"
      height="100vh"
      overflow="auto"
      paddingBottom="200px"
    >
      <Head>
        <title>Fair3d.me - the game&apos;s in the meta</title>
        <meta name="description" content="Generated for a cool (2nd...) one-off demonstration to illustrate the power of Hydra, who is King." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container mt={"35px"} maxW="460px">
      
    <VStack spacing={4} align="stretch">
          <Heading mb={2} fontSize="24px" fontWeight={600}>
            Fair3d.me
<br />
     
  
          </Heading>
          <LbcStatus tokenBondingKey={tokenBondingKey} goLiveDate={new Date(phaseOneEnd as number)} />
          <Box
            zIndex={1}
            shadow="xl"
            rounded="lg"
            p="16px"
            pb="29px"
            minH="300px"
            bg="black.300"
          >
            {loading && (
              <Center>
                <Spinner />
              </Center>
            )}
            {!loading && staked && tokenBondingKey && (
              <VStack align="stretch" spacing={8}>
                <LbcInfo
                members={members as number}
                staked={staked}
                total={total as number}
                mintPublicKey={mintPublicKey}
                mintPublicKey2={mintPublicKey2}
                fanout={fanout}
                min={min as number}
                fairLaunch={fairLaunch}
                onDeposit={onDeposit}
              wallet={wallet}
                  Pot={
                    // @ts-ignore
                    fairLaunch?.treasury / 1000000000}
                  price={min as number}
                  tokenBondingKey={tokenBondingKey}
                  useTokenOfferingCurve
                />
                <Swap tokenBondingKey={tokenBondingKey} />
                
 
                <Branding />
              </VStack>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export const Home: NextPage = (props) => {

  var fanout = usePublicKey("5dNo3SrhR3FhY4aqSsaZNeZ3XfvAnQxtY98QKuGvZzgN")


  return (
    <DarkMode>
      <LbcDisplay {...props} />
    </DarkMode>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      foo: "bar"
    }
  }
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}
export default Home;
