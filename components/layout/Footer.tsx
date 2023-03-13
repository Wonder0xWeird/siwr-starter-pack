import { Flex, Box, Button, Image } from "@chakra-ui/react"
import Console from "../common/Console"
import React from "react"
import siwrConfig from "../../siwr.config"

export default function Footer() {
  return (
    <Box
      position="fixed"
      bg="gray.700"
      w="98%"
      ml="1%"
      bottom="0"
      borderRadius={"20px 20px 0 0"}
      zIndex={99999}
    >
      <Console
        p="0px 10px"
        maxW="1400px"
        m="auto"
        mb="5px"
        borderRadius={"20px"}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Button
            as="a"
            href={siwrConfig.origin}
            variant="navLink"
            p="0px"
            size="sm"
          >
            <Image src="/images/ronin-logo.png" width="25px" height="25px" />
          </Button>
          <Button
            as="a"
            href="https://twitter.com"
            variant="navLink"
            p="0px"
            size="sm"
          >
            <Image src={"/images/twitter.svg"} width="20px" height="20px" />
          </Button>
          <Button
            as="a"
            href="https://discord.gg"
            variant="navLink"
            p="0px"
            size="sm"
          >
            <Image src={"/images/discord.svg"} width="25px" height="25px" />
          </Button>
          <Button
            as="a"
            href="https://tiyo.gitbook.io"
            variant="navLink"
            p="0px"
            size="sm"
          >
            <Image src={"/images/gitbook.svg"} width="25px" height="25px" />
          </Button>
        </Flex>
      </Console>
    </Box>
  )
}
