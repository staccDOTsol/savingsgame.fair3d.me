import React from "react";
import { Box, Center, Flex, HStack, Icon, Text, Link, LinkProps } from "@chakra-ui/react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface IMenuItemProps extends LinkProps {
  isLast?: boolean;
}

export const Header: React.FC = () => (
  <Center
    w="full"
    paddingX={14}
    paddingY={2}
    justifyContent="space-between"
    alignItems="center"
    color="white"
    bg="grey"
  >
    <HStack spacing={4}>
      <Text fontSize="xl">War of Attrition by Jare on ◎</Text>
      
    </HStack>
    <Text fontSize="xl">this thing is unsafe until @hasheddude approves</Text>
      
    <Text
      fontSize="xl"
      mb={{ base: true ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: true ? 0 : 8 }}
      display="block"
    >
      <Link href="https://hackernoon.com/preview/ZnENJBsSKAyEMoCyYyHx">
        Tutorial
      </Link>
    </Text>
    <Box display={{ md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
      <HStack
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <WalletMultiButton />
        <WalletDisconnectButton />
      </HStack>
    </Box>
  </Center>
);
