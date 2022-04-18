import {FanoutClient} from "@glasseaters/hydra-sdk";
import * as anchor from '@project-serum/anchor';
import { Connection } from '@solana/web3.js'
import {NATIVE_MINT} from "@solana/spl-token";
import { FAIR_LAUNCH_PROGRAM } from "./fair-launch";
import {
  Box,
  BoxProps,
  Button,
  Center,
  Collapse,
  Icon,
  LightMode,
  Link,
  Input,
  Progress,
  Spinner,
  Stack,
  Text,
  TextProps,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useInterval,
  VStack,
  HStack
} from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import {
  useCurve,
  useTokenBonding,
  useTokenMetadata,
  useCapInfo,
  usePublicKey,
} from "@strata-foundation/react";
import { getAssociatedAccountBalance } from "@strata-foundation/spl-utils";

import moment from "moment";
import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useLivePrice } from "../hooks/useLivePrice";
import { numberWithCommas } from "../utils/numberWithCommas";
import { BondingPlot } from "./BondingPlot";
import { Anchor } from "antd";

let first = true;
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
export const LbcInfo = ({
  members, 
  staked,
  total,
  tokenBondingKey,
  useTokenOfferingCurve = false,
  price: inputPrice,
  wallet,
  onDeposit,
  min,
  fairLaunch,
  mintPublicKey,
  mintPublicKey2,
  fanout
}: {members: number, 
  staked: number,
  total: number ,
  tokenBondingKey: PublicKey;
  useTokenOfferingCurve?: boolean;
  price?: number;
  wallet: any;
  onDeposit: any;
  min: number;
  fairLaunch: any;
  mintPublicKey2: any;
  mintPublicKey: any;
  fanout: any;
}) => {
    var [shares, setShares] = useState("1.38");
    var [Pot, setPot] = useState(0);

    async function onChange(e: any){
        e.preventDefault()
        console.log(e.target.value)
        setShares(e.target.value)
        }
   
  var connection2 = new Connection('https://ssc-dao.genesysgo.net/', "confirmed");

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });
  const { info: tokenBonding, loading: loadingBonding } =
    useTokenBonding(tokenBondingKey);
  const { price, loading: loadingPricing } = useLivePrice(tokenBondingKey);
  const { numRemaining, mintCap } = useCapInfo(
    tokenBondingKey,
    useTokenOfferingCurve
  );

  const priceToUse = inputPrice;

  const { info: curve } = useCurve(tokenBonding?.curve);
  

  const { metadata } = useTokenMetadata(tokenBonding?.targetMint);

  async function claim(){
    if (wallet){    var fanoutSdk: FanoutClient;
      fanoutSdk = new FanoutClient(
        connection2  ,
        // @ts-ignore
        wallet
    );
  
  var ix = await fanoutSdk.distributeTokenMemberInstructions(
    {
      
      distributeForMint: true,
      // @ts-ignore
      fanout: fanout,
      fanoutMint: mintPublicKey,
      // @ts-ignore
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
    // @ts-ignore
    fanout: fanout,
    fanoutMint: mintPublicKey2,
    // @ts-ignore
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

  console.log( (parseFloat(shares) * 10 ** 9))
  var  ixs = await fanoutSdk.stakeTokenMemberInstructions(
        {
            
            shares:  (parseFloat(shares) * 10 ** 9),
            // @ts-ignore
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

    
    await fanoutSdk.unstakeTokenMember({
        // @ts-ignore
      fanout: fanout,
      // @ts-ignore
      member: wallet.publicKey,
      // @ts-ignore
      payer: wallet.publicKey
  }
  );
    }
  
  }
  const theThing = usePublicKey("379FrY1oD5B4JVbddYaceSGVq78LaQZHvsu2DQ5uyVbT")
  const mintKey = usePublicKey("7LKE2d1ynpnYx8picYYijJwZMC8aQ941jQidNWtTEsLq")
  const [balance, setBalance] = useState(0)
  if (first){
    first = false
    setTimeout(async () => {
      try {
      // @ts-ignore
  var tokenAmount = await getAssociatedAccountBalance(connection2, wallet.publicKey, mintKey)
  // @ts-ignore
  setBalance( tokenAmount.uiAmount)
  }
  catch (err){
  
  }
    setInterval(async () => {
      try {
      // @ts-ignore
  var tokenAmount = await getAssociatedAccountBalance(connection2, wallet.publicKey, mintKey)
  // @ts-ignore
  setBalance( tokenAmount.uiAmount)
  }
  catch (err){
  
  }
  try {

    const provider = new anchor.Provider(connection2, wallet, {
      preflightCommitment: 'recent',
    });
    const tokenAccountInfo = await provider.connection.getTokenAccountBalance(theThing as PublicKey)
    
  
    
    console.log(tokenAccountInfo);
    if (tokenAccountInfo){
setPot( (tokenAccountInfo).value.uiAmount as number)
    }
}
catch (err){
  console.log(err)
  console.log(err)
  console.log(err)
  console.log(err)
  console.log(err)

}
    },  2500)    },  3500)


}
  return (
    <VStack spacing={6} align="stretch">
{true &&// members && staked && total && 
<div>
<Stack direction={["column", "row"]}>
      <HStack flexGrow={4}>
      <VStack flexGrow={4}>

<BigText>
 
          <BlackBox w="full" position="relative">{numberWithCommas(members, 0)} </BlackBox> Members
 </BigText>
 
</VStack>
</HStack>
</Stack> 
  <Stack direction={["column", "row"]}>
      <HStack flexGrow={4}>



<BigText>
 
 <BlackBox w="full" position="relative">{numberWithCommas(staked, 4)} Staked </BlackBox> 
 
</BigText>


<BigText>
 
 <BlackBox w="full" position="relative">{numberWithCommas(total, 4)} Total</BlackBox> 
</BigText>

</HStack>
</Stack></div>}
<Stack direction={["column", "row"]}>
      <VStack flexGrow={4}>

<BigText>
 
          <BlackBox w="full" position="relative">{numberWithCommas(balance, 4)}  </BlackBox> Your {
                metadata?.data.symbol
              } Balance
 </BigText>
</VStack>
</Stack>

      <Stack direction={["column", "row"]}>

      

        <VStack flexGrow={4}>

        <BigText>
              BID NOW TO WIN 
                  
                  </BigText>
          <BlackBox w="full" position="relative">
            {loadingPricing || typeof priceToUse == "undefined" ? (
              <Spinner size="lg" />
            ) : ( <Button
                onClick={onDeposit}
                disabled={
                  false 
                }
              >

              <BigText>
                {isNaN(priceToUse)
                  ? "Not Started"
                  : `@${numberWithCommas(priceToUse * 1.2, 4)} ${
                      metadata?.data.symbol
                    }`}
              </BigText> </Button>
            )}
          </BlackBox>
          <VStack flexGrow={1}>



</VStack>
         
        </VStack>
        </Stack>

        <Stack direction={["column", "row"]}>
        <VStack flexGrow={1}>
          <BlackBox w="full" position="relative">
          
            {loadingBonding ? (
              <Spinner />
            ) : (
               
              <BigText>

                { !isNaN(Pot) && numberWithCommas(Pot * 0.75, 4)} USD
              </BigText>
            )}
            <LightMode>
            
            </LightMode>
          </BlackBox>
          <Text fontWeight={700}>Grand Prize</Text>
        </VStack>
        <VStack>
        <Button onClick={claim} >meCLAIM</Button>

        <Input  style={{color:"black", fontSize: "30px;", backgroundColor: "grey"}} type="text" onInput={onChange} value={shares} />

        <Button  onClick={doit} >STAKEme</Button>

<Button  onClick={us} >UNSTAKEALLme</Button>
</VStack>
        </Stack>

        <Stack direction={["column", "row"]}>
                    <VStack flexGrow={1}>
          <BlackBox w="full" position="relative">
            {fairLaunch?.state.authority.toBase58().slice(0, 3) +
                '...' +
                fairLaunch?.state.authority
                  .toBase58()
                  .slice(
                    fairLaunch?.state.authority.toBase58().length - 3,
                    fairLaunch?.state.authority.toBase58().length,
                  )} wins the entire grand prize when the countdown reaches 0.<br /><br />  If anyone outbids them before that, the timer resets.
          <br /> <br />Notably another  ◎ {numberWithCommas(Pot * 0.25, 4)} persists for the next round...
            <LightMode>
            
            </LightMode>
          </BlackBox>
          <Text fontWeight={700}>Glhf :)</Text>
        </VStack>
      </Stack>

      <Button
            color={useColorModeValue("black", "white")}
            variant="link"
            fontWeight={700}
            onClick={onToggle}
            rightIcon={
              <Icon
                mb="-3px"
                color="gray.300"
                as={isOpen ? BsChevronUp : BsChevronDown}
              />
            }
          >
            What?
          </Button>
      <Collapse in={isOpen} animateOpacity>
          
        <VStack align="left" spacing={4} padding={4}>
          {isOpen && <BondingPlot tokenBondingKey={tokenBondingKey} />}
          <VStack spacing={1} align="left">
            <Text fontSize="14px" fontWeight="700">
              What?
            </Text>
            <Text fontSize="12px">
              Risk only what you can afford to lose.
              <br />
              <br />1. there is a social token
    <br />2. every time someone buys or sells the social token, there are 5% fees of sol amount and 5% fees of token amount
    <br />3. these fees go into a big fanout wallet
    <br />4. the recipients of the fees are staked tokenholders
    <br />5. you go to the site
    <br />6. there is a countdown clock, and if you deposit more $ than the last player and nobody else deposits before timer is up then you win
    <br />7. it is an english style auction and there is 1 winner :) glhf :)
    <br />8. game over? did not win? still staked? good news! round #2!
            </Text>
          </VStack>
        </VStack>
      </Collapse>
    </VStack>
  );
};