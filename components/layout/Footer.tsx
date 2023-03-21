import { Flex, Box, Button, Image } from "@chakra-ui/react"
import Console from "../common/Console"
import React from "react"

export default function Footer() {
  return (
    <Box
      position="fixed"
      bg="gray.700"
      w="98%"
      ml="1%"
      bottom="0"
      borderRadius={"30px 30px 0 0"}
      zIndex={99999}
    >
      <Console
        p="2px 10px"
        maxW="1400px"
        m="auto"
        mb="5px"
        borderRadius={"30px"}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Button as="a" href={"/"} variant="nav">
            <Image
              src="/images/icons/ronin-logo.svg"
              width="25px"
              height="25px"
            />
          </Button>
          <Button as="a" href="https://twitter.com/Ronin_Network" variant="nav">
            <Image
              src={"/images/icons/twitter.svg"}
              width="20px"
              height="20px"
            />
          </Button>
          <Button as="a" href="https://discord.gg/roninnetwork" variant="nav">
            <Image
              src={"/images/icons/discord.svg"}
              width="25px"
              height="25px"
            />
          </Button>
          <Button as="a" href="https://docs.roninchain.com/" variant="nav">
            <Image
              src={"/images/icons/gitbook.svg"}
              width="25px"
              height="25px"
            />
          </Button>
        </Flex>
      </Console>
    </Box>
  )
}
