import React from "react"
import axios from "axios"
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  SimpleGrid,
  GridItem,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react"

import Team from "./sub/Team"
import AxieCardsViewer from "./sub/AxieCardsViewer"

import {
  getAxieBriefList,
  getAxieDetail,
} from "../../../lib/backend/api/utils/graphQueries"
import { useRouter } from "next/router"
import { getAxieGameStats } from "../../../lib/utils/axieFeatures"

export default function Game(props) {
  const [axieList, setAxieList] = React.useState<any[] | null>(null)

  const [registeringAxies, setRegisteringAxies] = React.useState<any[]>([])
  const [registeredAxies, setRegisteredAxies] = React.useState<any[]>([])
  const [isRegistering, setIsRegistering] = React.useState<boolean>(false)

  const router = useRouter()

  React.useEffect(() => {
    getAxies()
  }, [])

  async function getAxies() {
    let finalizedAxies = []
    console.log("props.user:", props.user)
    const receivedAxies = await axios
      .get("/api/inventory/registeredAxies")
      .then((response) => response.data.data.registeredAxies)
      .catch((err) => {
        if (err.response) {
          console.log("Error getting axies:", err.response.data)
          if (
            err.response.data.message ===
            "You must connect a Ronin address in order to register personal axies."
          ) {
            alert(
              "You must connect a Ronin address in order to register personal axies."
            )
          }
        }
      })
    console.log("receivedAxies:", receivedAxies)
    if (receivedAxies) {
      for (let i = 0; i < receivedAxies.length; i++) {
        const id = receivedAxies[i].axieId
        const axieDetails = await getAxieDetail(id, "").catch((err) => {
          console.log("Error getting axie detail:", err)
        })
        // console.log("axieDetails:", axieDetails)

        const stats = getAxieGameStats(axieDetails.class, axieDetails.bodyShape)
        axieDetails.stats = stats
        for (let j = 0; j < axieDetails.parts.length; j++) {
          axieDetails.parts[j].level =
            receivedAxies[i].parts[
              axieDetails.parts[j].type.toLowerCase()
            ].skillLevel
        }
        finalizedAxies.push(axieDetails)
      }
      console.log("finalizedAxies:", finalizedAxies)
      setRegisteredAxies(finalizedAxies)
    }

    const foundAxieList: any[] = (await getAxieBriefList(
      props.user.address
    )) as any[]

    console.log("foundAxieList:", foundAxieList)

    //loop through foundAxieList
    for (const axie in foundAxieList) {
      const stats = getAxieGameStats(
        foundAxieList[axie].class,
        foundAxieList[axie].bodyShape
      )
      foundAxieList[axie].stats = stats
    }

    setAxieList(foundAxieList)
  }

  const isFullTeam = registeringAxies.length === 3

  async function completeRegistration() {
    setIsRegistering(true)
    await axios
      .post("/api/auth/register-axies", registeringAxies)
      .then(async (result) => {
        setRegisteredAxies((prevState) => [...prevState, ...registeringAxies])
        setRegisteringAxies([])
        setIsRegistering(false)
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error registering axies:", err.response.data)
          alert(err.response.data.message)
        }
        setIsRegistering(false)
      })
  }

  async function unregister() {
    setIsRegistering(true)
    await axios
      .post("/api/auth/unregister-axies")
      .then(async (result) => {
        // useStorage().setItem("registered_axies", "")

        if (result.data.statusCode === 200) {
          setRegisteredAxies([])
          setRegisteringAxies(registeredAxies)
        }
        setIsRegistering(false)
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error getting axies:", err.response.data)
          if (
            err.response.data.message ===
            "You must connect a Ronin address in order to register personal axies."
          ) {
            alert(
              "You must connect a Ronin address in order to register personal axies."
            )
          }
        }
        setIsRegistering(false)
      })
  }

  //Define a variable for conditionally rendering the user's axies based on completion of data fetching
  let isReady = registeredAxies ? registeredAxies.length === 3 : false

  return (
    <VStack position="relative" w="96%" m="0 auto 20px">
      {registeredAxies.length !== 3 ? (
        <VStack maxW={"900px"} textAlign="center">
          <Heading
            textAlign="center"
            mt="10px"
            fontSize={{ base: "25px", md: "35px" }}
          >
            Select Defenders For Your DoLL Team!
          </Heading>
          <Text>
            Browse through your Axies below and click on their card to select
            them into your Team.
          </Text>
          <Text>
            Once selected, use the "X" on your Axie Team's cards to swap them
            out for a different set of Axies.
          </Text>
          <Text>
            Once you have 3 Axies selected, click "LOCK IN YOUR TEAM"!
          </Text>
          <Text>
            Registering Axies is free, and you can always come back to Register
            different Axies!
          </Text>
        </VStack>
      ) : (
        <VStack maxW={"900px"} textAlign="left">
          <Heading
            textAlign="left"
            mt="10px"
            fontSize={{ base: "25px", md: "35px" }}
          >
            YOU'RE READY TO PLAY DoLL!
          </Heading>
          <Text>1. Register 3 of your Axies</Text>
          <Text>2. Practice Mode (5 Training Shields Given Daily)</Text>
          <Text>3. Ranked Mode (Enlist Your Axies & Buy Shield to Enter)</Text>
        </VStack>
      )}

      <SimpleGrid
        columns={{ base: 1, xl: 6 }}
        className="centerFlex"
        borderRadius="15px"
        spacingY="10px"
        w="100%"
      >
        <GridItem
          bg={useColorModeValue("gray.300", "gray.800")}
          h="100%"
          colSpan={1}
          borderRadius="15px"
          mr={{ base: "0px", xl: "10px" }}
        >
          <VStack h="100%">
            {/* <Heading mt="20px" fontSize="30px">
              ACTIONS
            </Heading> */}
            {
              <SimpleGrid
                columns={{ base: 1, sm: 2, xl: 1 }}
                w="100%"
                spacing={2}
                p={2}
              >
                <GridItem colSpan={1} justifyContent="center">
                  <Flex
                    display={isReady ? null : "none"}
                    className={"centerFlex"}
                    // m="10px 0px 10px 0px !important"
                    m="auto"
                    maxW="90%"
                    flexWrap="wrap"
                    borderRadius="15px"
                    p="10px"
                    textAlign="center"
                    bg={useColorModeValue("gray.300", "gray.600")}
                    justifyContent="space-evenly"
                  >
                    <Box fontSize="16px">Try New Axies</Box>
                    <Button
                      fontSize="14px"
                      // mt="10px"
                      variant="registration"
                      onClick={unregister}
                      disabled={isRegistering}
                    >
                      ♻️ UNREGISTER
                    </Button>
                  </Flex>
                </GridItem>

                <GridItem colSpan={1}>
                  <Flex
                    display={isReady ? null : "none"}
                    className={"centerFlex"}
                    // m="10px 0px 10px 0px !important"
                    m="auto"
                    maxW="90%"
                    flexWrap="wrap"
                    borderRadius="15px"
                    p="10px"
                    textAlign="center"
                    bg={useColorModeValue("gray.300", "gray.600")}
                    justifyContent="space-evenly"
                  >
                    <Box fontSize="16px">Compete in Ranked</Box>
                    <Button
                      fontSize="14px"
                      // mt="10px"
                      variant="registration"
                      onClick={() => router.push("/game/enlist")}
                      disabled={isRegistering}
                    >
                      🏹 ENLIST
                    </Button>
                  </Flex>
                </GridItem>

                <GridItem colSpan={{ base: 1, sm: 3, xl: 1 }}>
                  <Flex
                    display={isReady ? null : "none"}
                    // columnGap="10px"
                    // mt="0px!important"
                    // pb="5px"
                    w="100%"
                    maxW="500px"
                    m="auto"
                    alignItems={"center"}
                    justifyContent="space-around"
                  >
                    <SimpleGrid
                      columns={{ base: 3, lg: 1 }}
                      spacing={2}
                      alignItems="center"
                    >
                      <GridItem colSpan={1}>
                        <Heading textAlign={"center"} size="md">
                          Download DoLL:
                        </Heading>
                      </GridItem>
                    </SimpleGrid>
                  </Flex>
                </GridItem>
              </SimpleGrid>
            }

            {!isReady && (
              <Flex
                className={"centerFlex"}
                m="10px 0px 10px 0px !important"
                maxW="90%"
                flexWrap="wrap"
                borderRadius="15px"
                p="10px"
                textAlign="center"
                bg="gray.300"
              >
                <Box fontSize="16px" color="black">
                  Select 3 axies to participate in DoLL!
                </Box>
                <Button
                  variant="registration"
                  mt="10px"
                  fontSize="14px"
                  className="buttonFadein"
                  onClick={completeRegistration}
                  // display={isFullTeam ? null : "none"}
                  disabled={!isFullTeam || isRegistering}
                >
                  LOCK IN YOUR TEAM
                </Button>
              </Flex>
            )}
          </VStack>
        </GridItem>
        <GridItem
          bg={useColorModeValue("gray.300", "gray.800")}
          borderRadius="15px"
          colSpan={5}
          overflowX="scroll"
        >
          <SimpleGrid
            minW="1000px"
            columns={3}
            display="flex"
            alignItems="space-between"
            justifyContent="center"
            textAlign="center"
          >
            <Team
              registeredAxies={registeredAxies}
              setRegisteringAxies={setRegisteringAxies}
              registeringAxies={registeringAxies}
              unregister={unregister}
            />
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
      <VStack
        borderRadius="15px"
        bg={useColorModeValue("gray.300", "gray.800")}
      >
        <Flex
          flexDirection={{ base: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <Heading fontSize="33px">
            Total Axies : {axieList && axieList.length}
          </Heading>
        </Flex>
        <AxieCardsViewer
          registeredAxies={registeredAxies}
          registeringAxies={registeringAxies}
          setRegisteringAxies={setRegisteringAxies}
          axieList={axieList}
          setAxieList={setAxieList}
        />
      </VStack>
    </VStack>
  )
}
