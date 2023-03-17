import React from "react"
import { Box } from "@chakra-ui/react"
import Console from "../../../common/Console"

import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Banner() {
  return (
    <Console
      mt="3px"
      bg="linear-gradient(90deg, #4daffe 0%, #34aeff 47%, #008efe 100%)"
      w="96%"
      ml="2%"
      p="5px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      id="banner"
      borderRadius={"32px"}
      mb="20px"
    >
      <Box w="100%">Notify your users about recent updates here!</Box>
    </Console>
  )
}
