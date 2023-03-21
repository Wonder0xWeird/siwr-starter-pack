import React from "react"
import { Box } from "@chakra-ui/react"
import Console from "../../../common/Console"
import { DESIGN_MAX_WIDTH } from "../../../../styles/theme"

export default function Banner() {
  return (
    <Console
      bg="linear-gradient(90deg, #4daffe 0%, #34aeff 47%, #008efe 100%)"
      w="96%"
      maxW={DESIGN_MAX_WIDTH * 0.96}
      m="3px auto 20px"
      p="5px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius={"32px"}
    >
      <Box w="100%">Notify your users about recent updates here!</Box>
    </Console>
  )
}
