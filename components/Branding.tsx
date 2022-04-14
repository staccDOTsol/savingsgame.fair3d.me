import { Text, Link, Image, HStack, VStack } from "@chakra-ui/react";
import React from "react";

export const Branding = () => (
  <VStack>
    <HStack spacing={4}>
      <Link isExternal href="https://twitter.com/STACCart">
        @STACCart
      </Link>
      <Link isExternal href="https://github.com/staccDOTsol">
       GitHub
      </Link>
    </HStack>
    <Text fontSize="14px" color="gray.400">
      Powered by Jare &amp; Strata &amp; Metaplex
    </Text>
  </VStack>
);