import React from "react"
import { VStack, Heading, Text, Image } from "@chakra-ui/react"
import Console from "../../common/Console"

export default function Game() {
  return (
    <VStack>
      <Heading>Game Page</Heading>
      <Text>Start here to fill in information about your game or service!</Text>
      <Console
        w="1090px"
        h="288px"
        bg={"url(/images/ronin-climate-splash.png)"}
        backgroundSize="1158px 344px"
        backgroundRepeat="no-repeat"
        backgroundPosition-x="calc(100% + 123px)"
        backgroundPosition-y="calc(100% + 60px)"
      ></Console>
    </VStack>
  )
}
