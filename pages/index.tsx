
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
let alala = true
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
  var connection2 = new Connection('https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2', "confirmed");

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
    var connection2 = new Connection('https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2', "confirmed");
  
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
}, 5500)
}
var mintPublicKey2 =usePublicKey("HoFAt8pK2jWhpts6L82KB1CpE3KDkz6bL6CAkBUCHXB6")  
var mintPublicKey = usePublicKey("E68AWnPhcs9coJUWRQDz2S9pbsD3Ed7uVVkbGsE9AoFj")


var tokenBondingKey = usePublicKey("8hCkbgHK1xDfeX9TGtL8qYB3PaxykbQC9EkW2LpckWoY")
var baseBondingKey =  usePublicKey("BJWWv32ePmZ1Gterm2jsWLo71q6RpCZpDoKANZ5J4xN2")
const { tokenBondingSdk, loading } = useStrataSdks();

const [contributed, setContributed] = useState(0);

const [basePrice, setBasePrice] = useState<number >(1);
const [targetPrice, setTargetPrice] = useState<number >(1);

  var connection2 = new Connection('https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2', "confirmed");
setTimeout(async function(){
if (first && tokenBondingSdk){
  console.log('ahahahahah')
  first = false

setInterval(async function(){
  try{
    console.log(1)
  if (tokenBondingSdk){
    console.log(2)

    var pricing = await tokenBondingSdk.getPricing(tokenBondingKey);
    var pricing2 = await tokenBondingSdk.getPricing(baseBondingKey);
    console.log(3)
    if (pricing && pricing2 && fairLaunch){
      console.log(4)
      // @ts-ignore
      var amountPerOneSol = pricing2.buyWithBaseAmount( (formatNumber.asNumber(fairLaunch?.state.data.last)) + 1);
      if (amountPerOneSol){ amountPerOneSol = amountPerOneSol * 1.138
    var currentBuyPriceSol = pricing.buyWithBaseAmount(amountPerOneSol);
  
    // @ts-ignore
    //alert(price) 0.22
    //alert(price2)0.04 0.28
    // @ts-ignore
    // @ts-ignore
    console.log(formatNumber.asNumber(fairLaunch?.state.data.last))
  console.log(fairLaunch?.state.treasury.toBase58())
    setMin2((  amountPerOneSol ))

    setMin((  currentBuyPriceSol ))

      }
  }
  }
  } catch(err){
    console.log(err)
  }
}, 940)

}
}, 666)

setTimeout(async function(){
  if (tokenBondingSdk ){

    var pricing = await tokenBondingSdk.getPricing(tokenBondingKey);
    var pricing2 = await tokenBondingSdk.getPricing(baseBondingKey);
    if (pricing && pricing2 && fairLaunch){
      // @ts-ignore
      var amountPerOneSol = pricing2.buyWithBaseAmount( (formatNumber.asNumber(fairLaunch?.state.data.last)) + 1);
      if (amountPerOneSol){ amountPerOneSol = amountPerOneSol * 1.138
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
  
}, 4500)
const [fairLaunch, setFairLaunch] = useState<FairLaunchAccount>();

const [alertState, setAlertState] = useState<AlertState>({
open: false,
message: '',
severity: undefined,
});

const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

const fairLaunchId = usePublicKey(
"CD3BxfZ3jfmndh4MYdZPubqG5Zm4uzQRJ7K5nN5QVwMJ",
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
if (min == 1 && fairLaunch && tf){
  tf = false
  if (tokenBondingSdk){
setTimeout(async function(){
    var pricing = await tokenBondingSdk.getPricing(tokenBondingKey);
    var pricing2 = await tokenBondingSdk.getPricing(baseBondingKey);
    if (pricing && pricing2 && fairLaunch){
      // @ts-ignore
      var amountPerOneSol = pricing2.buyWithBaseAmount( (formatNumber.asNumber(fairLaunch?.state.data.last)) + 1);
      
      if (amountPerOneSol){ amountPerOneSol = amountPerOneSol * 1.138
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
//setMin( (formatNumber.asNumber(fairLaunch?.state.data.last)) + 1)
}
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
    targetAmount: min * 1.1,
    slippage: 0.80
  })
  await tokenBondingSdk.sell({
    // @ts-ignore
    tokenBonding: baseBondingKey,
    targetAmount: min2 * 0.96,
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
    await purchaseTicket( ((formatNumber.asNumber(fairLaunch?.state.data.last)) + 1), wallet, fairLaunch, wallet.publicKey, program, connection2);
     
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
var mintPublicKey2 =usePublicKey("HoFAt8pK2jWhpts6L82KB1CpE3KDkz6bL6CAkBUCHXB6")  
var mintPublicKey = usePublicKey("E68AWnPhcs9coJUWRQDz2S9pbsD3Ed7uVVkbGsE9AoFj")
var fanout = usePublicKey("BdrfgTYt2FXhs7YeYChAASGk2EXyE1tpP6iqGzid5mMq")
const { error, execute } = useSwap();
const { handleErrors } = useErrorHandler();
handleErrors(error);
const { info: tokenBonding } = useTokenBonding(tokenBondingKey);
const { info: tokenBonding2, loading: loading123 } = useTokenBonding(baseBondingKey);
const [tradingMints, setTradingMints] = useState<{
  base?: PublicKey;
  target?: PublicKey;
}>({
  base: tokenBonding2?.baseMint,
  target: tokenBonding?.targetMint,
});
React.useEffect(() => {
  if ((!tradingMints.base || !tradingMints.target) && tokenBonding && tokenBonding2) {
    setTradingMints({
      base: tokenBonding2.baseMint,
      target: tokenBonding.targetMint,
    });
  }
}, [tokenBonding, tradingMints, tokenBonding2]);
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
                {!loading123 && min && min2 && 
                // @ts-ignore
    <SwapForm min={min * 1.1} isLoading={driverLoading} isSubmitting={loading} {...swapProps} />
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

  var fanout = usePublicKey("BdrfgTYt2FXhs7YeYChAASGk2EXyE1tpP6iqGzid5mMq")


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
