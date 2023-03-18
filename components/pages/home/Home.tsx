import React from "react"
import { VStack, Flex, Heading, Image } from "@chakra-ui/react"
import Console from "../../common/Console"
import { DESIGN_MAX_WIDTH } from "../../../styles/theme"
import { useRouter } from "next/router"
import Body from "./sub/body"

export default function Home() {
  const router = useRouter()
  return (
    <Console
      p="0"
      m="auto"
      maxW={DESIGN_MAX_WIDTH * 0.96}
      w="96%"
      overflow="hidden"
      alignItems="center"
      header
    >
      <VStack w="75%" m="auto" spacing={5} mb="40px">
        <Flex w="100%" alignItems="center" justifyContent="space-around">
          <Image src="/images/ronin-3d.png" w="200px" />
          <VStack>
            <Heading size="lg">Welcome to the</Heading>
            <Heading size="3xl">Sign In With Ronin</Heading>
            <Heading size="2xl">Starter Pack!</Heading>
          </VStack>
        </Flex>

        <Body />
      </VStack>
      <Image
        src="/images/ronin-network-splash.png"
        cursor="pointer"
        onClick={() => router.push("https://docs.roninchain.com/")}
      />
    </Console>
  )
}
