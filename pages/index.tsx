
import { Account } from "@solana/web3.js";
import { LbcStatus } from "../components/LbcStatus";
import { Branding } from "../components/Branding";
import { purchaseTicket } from "../components/fair-launch";
import { LbcInfo } from "../components/LbcInfo";
import { TokenOffering } from "../components/TokenOffering"
import { numberWithCommas } from "../utils/numberWithCommas";
import { FAIR_LAUNCH_PROGRAM } from "../components/fair-launch";
import {Keypair, LAMPORTS_PER_SOL} from "@solana/web3.js";
import toast from "react-hot-toast";

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
  ISwapFormProps,
  usePublicKey,
  useTokenBondingFromMint,
  useTokenRefFromBonding,
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
import { SwapForm } from '../components/SwapForm'
import { useSwapDriver, useErrorHandler, useTokenBonding, Notification, useSwap } from '@strata-foundation/react'
import { CreateButton, ITokenState } from '../components/CreateButton';
import { TokenDisplay } from '../components/TokenDisplay';
import styles from '../styles/Home.module.css';
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { SplTokenCollective } from "@strata-foundation/spl-token-collective";
let alala = true
let first = true
let first2 = true
let f123 = true
var last = 1
let firstlala = true
var publicKey
export const LbcDisplay: NextPage = ({
  name,
  image,
  description,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  var { publicKey } = useWallet();

  const [members, setMembers] = React.useState<number>(0);
  const [staked, setStaked] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
const [tokenState, setTokenState] = React.useState<ITokenState>({});
const wallet = useWallet()


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
  } as  any;
}, [wallet]);
if (firstlala && anchorWallet){
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
// @ts-ignore
setTotal((formatNumber.asNumber(new anchor.BN(fanoutAccount?.totalShares))))
// @ts-ignore
  setStaked((formatNumber.asNumber(new anchor.BN(fanoutAccount?.totalStakedShares))))
  // @ts-ignore
  setMembers(((new anchor.BN(fanoutAccount?.totalMembers))))
    }
}, 500)

setInterval(async function(){
  try {
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
  // @ts-ignore
  setTotal((formatNumber.asNumber(new anchor.BN(fanoutAccount?.totalShares))))
  // @ts-ignore
    setStaked((formatNumber.asNumber(new anchor.BN(fanoutAccount?.totalStakedShares))))
    // @ts-ignore
    setMembers(((new anchor.BN(fanoutAccount?.totalMembers))))
      }
    } catch (err){
       console.log(err)
    }
}, 15500)
}
var mintPublicKey2 =usePublicKey("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA")  
var mintPublicKey = usePublicKey("Ax4g2hBNLqxaJbbDUrwEErX1h1JKLdtJsRebcDWcNacA")



const { tokenBondingSdk, tokenCollectiveSdk, loading } = useStrataSdks();

const [contributed, setContributed] = useState(0);

const [basePrice, setBasePrice] = useState<number >(1);
const [targetPrice, setTargetPrice] = useState<number >(1);

  var connection2 = new Connection('https://ssc-dao.genesysgo.net/', "confirmed");
setTimeout(async function(){
if (first && tokenBondingSdk){
  console.log('ahahahahah')
  first = true

setInterval(async function(){
  try{
  if (tokenBondingSdk && tokenCollectiveSdk){
    
    var pricing = await tokenBondingSdk.getPricing(bond1 as PublicKey);
    
    if (pricing  ){
     
    var currentBuyPriceSol = pricing.buyWithBaseAmount(last + 138);
  
    // @ts-ignore
    //alert(price) 0.22
    //alert(price2)0.04 0.28
    // @ts-ignore
    // @ts-ignore
    setMin2((  1 ))

    setMin((  currentBuyPriceSol ))

  }
  }
  } catch(err){
    console.log(err)
  }
}, 940)

}
}, 356)

const [fairLaunch, setFairLaunch] = useState<FairLaunchAccount>();

const [alertState, setAlertState] = useState<AlertState>({
open: false,
message: '',
severity: undefined,
});

const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

const fairLaunchId = usePublicKey(
"eXQnsgk89eFSxKwkYLzdhAuWmsuv6PpAeTHiuXsxhtF",
);
if (first2 ){
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
    setFairLaunch(state);

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

}, 2250)

}

var  max, fee, step, median;
const [ min2 , setMin2 ] = useState<number>()
const [ min , setMin ] = useState<number>()
let tf = true

var phaseOneEnd =  toDate(fairLaunch?.state.data.phaseOneEnd)?.getTime();

const ValueSlider = (Slider)

// @ts-ignore

console.log(min)
// @ts-ignore
var fee = formatNumber.asNumber(fairLaunch?.state.data.fee);
// @ts-ignore
//var max = min + (1 * 1);
// @ts-ignore
var step = 1;
setInterval(async function(){
if (fairLaunch ){
  console.log(fairLaunch)
 last = formatNumber.asNumber(fairLaunch.state.data.last) as number;
 last = last 
 console.log(last)
}
}, 1000)
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
    console.log('deposit'); 
    const provider = new anchor.Provider(connection2, anchorWallet, {
      preflightCommitment: 'recent',
    });
  
    let fairLaunch2 = await getFairLaunchState(
      // @ts-ignore
      anchorWallet,
      // @ts-ignore
      fairLaunchId,
      connection2,
    );
    // @ts-ignore
    await purchaseTicket( last + 138, wallet, fairLaunch, wallet.publicKey, connection2);
     
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
var mintPublicKey2 =usePublicKey("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA")  
var mintPublicKey = usePublicKey("Ax4g2hBNLqxaJbbDUrwEErX1h1JKLdtJsRebcDWcNacA")
var mm = useTokenBondingFromMint(mintPublicKey)
var bond1 = (mm.info?.publicKey)
var mm = useTokenBondingFromMint(mintPublicKey2)

console.log(bond1?.toBase58())
var tokenBondingKey = bond1 
var fanout = usePublicKey("8gm9wdoBDUzLW38mwxPvNqmXxN14QdSdAdWMaUCPT6fG")
const { error, execute } = useSwap();
const { handleErrors } = useErrorHandler();
handleErrors(error);
const { info: tokenBonding } = useTokenBonding(tokenBondingKey);
const [tradingMints, setTradingMints] = useState<{
  base?: PublicKey;
  target?: PublicKey;
}>({
  base: mintPublicKey2,
  target: tokenBonding?.targetMint,
});
React.useEffect(() => {
  if ((!tradingMints.base || !tradingMints.target) && tokenBonding ) {
    setTradingMints({
      base: mintPublicKey2,
      target: tokenBonding.targetMint,
    });
  }
}, [tokenBonding, tradingMints]);
const identity = () => {};
var driverLoading: boolean 
var swapProps: any 
try{
// @ts-ignore
var { loading: driverLoading, ...swapProps } = useSwapDriver({
  tradingMints,
  onTradingMintsChange: setTradingMints,
  swap: (args) =>
   // @ts-ignore
    execute(args).then(({ targetAmount }) => {
      toast.custom((t) => (
        <Notification
          show={t.visible}
          type="success"
          heading="Transaction Successful"
          message={`Succesfully purchased ${Number(targetAmount).toFixed(
            9
          )} ${args.ticker}!`}
          onDismiss={() => toast.dismiss(t.id)}
        />
      ));
    }).catch(console.error),
  onConnectWallet: identity,
  tokenBondingKey: tokenBondingKey,
  
});
} catch (err){

}

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
            {!loading   && (
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
                  
                  price={min as number}
                  tokenBondingKey={tokenBondingKey as PublicKey}
                  useTokenOfferingCurve
                />
                { min && min2 && 
                // @ts-ignore
    <SwapForm min={min * 1.2} isLoading={driverLoading} isSubmitting={loading} {...swapProps} />
                }
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

  var fanout = usePublicKey("8gm9wdoBDUzLW38mwxPvNqmXxN14QdSdAdWMaUCPT6fG")


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
