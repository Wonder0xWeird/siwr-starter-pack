import React from "react"
import {
  Box,
  Flex,
  GridItem,
  Heading,
  Image,
  keyframes,
  SimpleGrid,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"

import styles from "./register.module.css"
import RegisterError from "./RegisterError"
import CharacterSkills from "./CharacterSkills"
import AxiePart from "./AxiePart"

//Returns cards for all the user's axies returned by a GraphQL request
export default function AxieCard(props) {
  const [errorRegistering, setErrorRegistering] = React.useState({
    id: "",
    error: "",
    isError: false,
  })
  const [scrollPos, setScrollPos] = React.useState(0)

  function registerAxie() {
    if (!props.pedestalColor) {
      const scrollElement: Element = document.getElementById("axielist")
      const scrollValue = scrollElement.scrollLeft
      if (props.registeredAxies.length === 3) {
        const errorMsg =
          "You've already registered 3 axies. Unregister to select a different team."
        console.log(errorMsg, props.registeringAxies)
        console.log(errorMsg, props.registeredAxies)
        setScrollPos(scrollValue)
        setErrorRegistering({
          id: props.axie.id,
          error: errorMsg,
          isError: true,
        })
        setTimeout(() => {
          setErrorRegistering({ id: "", error: "", isError: false })
        }, 6000)
      } else if (props.registeringAxies.length == 3) {
        const errorMsg = "You can only have 3 axies registered at a time!"
        console.log(errorMsg, props.registeringAxies)
        setScrollPos(scrollValue)
        setErrorRegistering({
          id: props.axie.id,
          error: errorMsg,
          isError: true,
        })
        setTimeout(() => {
          setErrorRegistering({ id: "", error: "", isError: false })
        }, 6000)
      } else if (
        props.registeringAxies.some((regAxie) => regAxie.id === props.axie.id)
      ) {
        const errorMsg = "Error, duplicate axie!"
        console.log(errorMsg, props.registeringAxies)
        setScrollPos(scrollValue)
        setErrorRegistering({
          id: props.axie.id,
          error: errorMsg,
          isError: true,
        })
        setTimeout(() => {
          setErrorRegistering({ id: "", error: "", isError: false })
        }, 6000)
      } else {
        const errorMsg = "No error"
        setErrorRegistering({
          id: props.axie.id,
          error: errorMsg,
          isError: false,
        })
        setTimeout(() => {
          setErrorRegistering({ id: "", error: "", isError: false })
        }, 6000)
        setScrollPos(scrollValue)
        props.setRegisteringAxies((prevState) => [...prevState, props.axie])
      }
    }
  }

  React.useEffect(() => {
    if (!props.pedestalColor) {
      const scrollElement: Element = document.getElementById("axielist")
      scrollElement.scroll({
        left: props.scrollPos,
        behavior: "auto",
      })
    }
  }, [])

  return (
    <VStack
      id={props.axie.id}
      onClick={registerAxie}
      boxShadow="0px 5px 5px 0 rgb(0, 0, 0, .2)"
      className={styles.axieCard}
      mt="0px!important"
      border={props.pedestalColor ? "1px solid " + props.pedestalColor : "none"}
      borderRadius="10px"
      bg={
        props.pedestalColor
          ? useColorModeValue("gray.200", "gray.700")
          : useColorModeValue("gray.200", "gray.700")
      }
      _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
    >
      {/* Absolute positioned error message over the axie card which prompted the error */}
      {errorRegistering.isError && (
        <RegisterError
          scrollPos={props.scrollPos}
          error={errorRegistering.error}
        />
      )}
      <SimpleGrid
        columns={2}
        position="relative"
        width="100%"
        // overflow="hidden"
      >
        <GridItem colSpan={1} className={styles.axieCard_top}>
          <Box
            color={useColorModeValue("black", "white")}
            mb="3px"
            fontSize="11px"
            fontWeight="800"
            textAlign="center"
          >
            {
              //concatenate props.axie.name to 8 characters
              props.axie.name.length > 13
                ? props.axie.name.substring(0, 13) + "..."
                : props.axie.name
            }
          </Box>
          <Flex
            color={useColorModeValue("black", "white")}
            fontSize="11px"
            textAlign="center"
            mb="3px"
            w="100%"
            gap="5px"
            alignItems="center"
            justifyContent="center"
          ></Flex>
          {/* DoLL-specific character skills i.e. HP, armor, movespeed, hp regen*/}
          <CharacterSkills axie={props.axie} />
        </GridItem>

        <GridItem colSpan={1}>
          <Image src={props.axie.image} className={styles.axieCardImage} />
        </GridItem>
      </SimpleGrid>
      <SimpleGrid
        spacing="5px"
        columns={3}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        fontSize="13px"
        className={styles.axieCard_bot + " centerFlex"}
        width="100%"
      >
        {props.axie.parts.map((part, index) => (
          <AxiePart
            customStyles={styles.partContainerCard}
            axieId={props.axie.id}
            key={index}
            part={part}
          />
        ))}
      </SimpleGrid>
    </VStack>
  )
}
