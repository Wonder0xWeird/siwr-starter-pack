import React from "react"
import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react"
import { SmallCloseIcon } from "@chakra-ui/icons"

import CharacterSkills from "./CharacterSkills"
import AxiePart from "./AxiePart"
import Console from "../../../../common/Console"

export default function AxieCard(props) {
  const [errorMessage, setErrorMessage] = React.useState<string>("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  function selectAxie() {
    if (props.pedestal) return

    console.log("props.registeringAxies:", props.registeringAxies)

    if (props.registeredAxies.length === 3) {
      onOpen()
      setErrorMessage(
        "You've already registered 3 axies. Unregister to select a different team."
      )
    } else if (props.registeringAxies.length == 3) {
      onOpen()
      setErrorMessage(
        "You already have 3 axies selected for registration. To select a different team, deselect one of the axies you've already selected."
      )
    } else if (
      props.registeringAxies.some((regAxie) => regAxie.id === props.axie.id)
    ) {
      onOpen()
      setErrorMessage("You have already selected this axie for registering.")
    } else {
      console.log("props.axie:", props.axie)
      props.setRegisteringAxies((prevState) => [...prevState, props.axie])
    }
  }

  function deselectAxie(e) {
    props.setRegisteringAxies((prevState) =>
      prevState.filter((axie) => axie.id !== props.axie.id)
    )
  }

  return (
    <Console
      onClick={selectAxie}
      w="350px"
      h="350px"
      position="relative"
      hover={props.hover}
      selected={props.selected}
    >
      {props.pedestal && !props.registered && (
        <IconButton
          variant="primary"
          size="xs"
          onClick={deselectAxie}
          aria-label="Deselect Axie"
          icon={<SmallCloseIcon boxSize={4} />}
          position="absolute"
          right="10px"
        />
      )}
      <Flex>
        <VStack w="50%">
          {props.pedestal ? (
            <Box textAlign="center">{`Axie ${props.axie.id}`}</Box>
          ) : (
            <Box textAlign="center">
              {props.axie.name.length > 13
                ? props.axie.name.substring(0, 13) + "..."
                : props.axie.name}
            </Box>
          )}

          <CharacterSkills axie={props.axie} />
        </VStack>
        <Image
          w="50%"
          src={`https://axiecdn.axieinfinity.com/axies/${props.axie.id}/axie/axie-full-transparent.png`}
        />
      </Flex>

      <SimpleGrid spacing="5px" columns={3} width="100%">
        {props.axie.parts.map((part, index) => (
          <AxiePart axieId={props.axie.id} key={index} part={part} />
        ))}
      </SimpleGrid>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <Console>
            <AlertDialogHeader>Error Selecting Axie:</AlertDialogHeader>
            <AlertDialogBody>{errorMessage}</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                variant="primary"
                ref={cancelRef}
                onClick={() => {
                  onClose()
                  setErrorMessage("")
                }}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </Console>
        </AlertDialogContent>
      </AlertDialog>
    </Console>
  )
}
