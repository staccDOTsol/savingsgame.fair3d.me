import React, { useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useTokenBonding } from "@strata-foundation/react";
import { Countdown } from "./Countdown";
import { Center, Text, useInterval } from "@chakra-ui/react";

export const LbcStatus = ({
  tokenBondingKey,
  goLiveDate
}: {
  tokenBondingKey?: PublicKey;
  goLiveDate?: Date;
}) => {
  const { info: tokenBonding } = useTokenBonding(tokenBondingKey);
  
  const [isLive, setIsLive] = useState(true);
  useInterval(() => {
    setIsLive(goLiveDate ? goLiveDate < new Date() : true);
  }, 500);
 if (!isLive && goLiveDate) {
    return <Countdown date={goLiveDate} />;
  } else {
    return null;
  }
};