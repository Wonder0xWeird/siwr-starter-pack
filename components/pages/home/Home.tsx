import React from "react"
import { VStack, Flex, Heading, Image } from "@chakra-ui/react"
import Console from "../../common/Console"
import { useRouter } from "next/router"
import Body from "./sub/Body"
import windowWidth from "../../../lib/frontend/hooks/window"

export default function Home() {
  const router = useRouter()

  return (
    <Console
      p="0"
      m="auto"
      w="100%"
      overflow="hidden"
      alignItems="center"
      header
    >
      <VStack w="75%" m="auto" spacing={5} mb="40px">
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="space-around"
          pt="10px"
        >
          {windowWidth(770) && (
            <Image src="/images/ronin-3d.png" maxW="200px" w="25%" />
          )}
          <VStack textAlign="center">
            <Heading size="lg">Welcome to the</Heading>
            <Heading size="3xl" lineHeight={"60px"}>
              Sign In With Ronin
            </Heading>
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
