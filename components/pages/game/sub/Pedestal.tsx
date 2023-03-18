import React from "react"
import {
  Box,
  Flex,
  GridItem,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"

import styles from "./register.module.css"
import AxieCard from "./AxieCard"

export default function Pedestal(props) {
  function removeAxie(e) {
    props.setRegisteringAxies((prevState) =>
      prevState.filter((axie) => axie.id !== e.target.id)
    )
  }

  let getBorderRadius = props.number === 0 ? "15px 0px 0px 15px" : "0px"
  getBorderRadius = props.number === 2 ? "0px 15px 15px 0px" : getBorderRadius

  const borderColor = props.registeredAxies < 3 ? "#f2eb13" : "#007a14"

  return (
    <GridItem
      minW="250px!important"
      p="15px"
      colSpan={1}
      borderRadius={getBorderRadius}
    >
      <VStack
        w="300px"
        h="100%"
        justifyContent="flex-end"
        position="relative"
        pb="0!important"
      >
        {/* <AxieCard axie={props.axie} pedestalColor={borderColor} /> */}
      </VStack>
    </GridItem>
  )
}
