import React from "react"
import axios from "axios"
import {
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Tooltip,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react"

import AxieCard from "./sub/AxieCard"
import Loading from "../../common/Loading"
import Console from "../../common/Console"
import { getAxieBriefList, IAxie } from "../../../lib/frontend/graphQueries"
import { DESIGN_MAX_WIDTH } from "../../../styles/theme"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import AxieTeam from "./sub/AxieTeam"
import { IRegisteredAxie } from "../../../lib/backend/mongo/models/schemas/registeredAxies"

export default function Game(props) {
  const [axieList, setAxieList] = React.useState<IAxie[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  const [pages, setPages] = React.useState<number[]>([])
  const [perPage, setPerPage] = React.useState<number>(10)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [pageInput, setPageInput] = React.useState<number>(1)

  const [registeringAxies, setRegisteringAxies] = React.useState<
    IAxie[] | IRegisteredAxie[]
  >([])
  const [registeredAxies, setRegisteredAxies] = React.useState<
    IRegisteredAxie[]
  >([])
  const [isRegistering, setIsRegistering] = React.useState<boolean>(false)
  const [isRegistered, setIsRegistered] = React.useState<boolean>(false)

  React.useEffect(() => {
    getAxies()
  }, [])

  async function getAxies() {
    const registeredAxies: IRegisteredAxie[] = await axios
      .get("/api/inventory/registeredAxies")
      .then((response) => response.data.data)
      .catch((err) => {
        console.log("Error getting axies:", err?.response?.data?.message)
        return []
      })
    console.log("registeredAxies:", registeredAxies)
    console.log("registeredAxies.length === 3:", registeredAxies.length === 3)
    setRegisteredAxies(registeredAxies)
    setIsRegistered(registeredAxies.length === 3)

    const foundAxieList: IAxie[] = await getAxieBriefList(props.user.address)
    setAxieList(foundAxieList)

    const numPages = Math.ceil(foundAxieList.length / perPage) ?? 0
    setPages(Array.from(Array(numPages).keys()))

    setLoading(false)
  }

  async function register() {
    setIsRegistering(true)
    await axios
      .post("/api/inventory/register", registeringAxies)
      .then(async (result) => {
        console.log("result.data.data:", result.data.data)
        setRegisteredAxies(result.data.data)
        setRegisteringAxies([])
        setIsRegistered(true)
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
      .post("/api/inventory/unregister")
      .then(async (result) => {
        if (result.data.statusCode === 200) {
          setIsRegistered(false)
          setRegisteredAxies([])
          setRegisteringAxies(registeredAxies)
        }
        setIsRegistering(false)
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error getting axies:", err.response.data)
        }
        setIsRegistering(false)
      })
  }

  function updatePage(e) {
    e.preventDefault()
    if (pageInput < 1) {
      setPageInput(1)
      setCurrentPage(1)
    } else if (pageInput > pages.length) {
      setPageInput(pages.length)
      setCurrentPage(pages.length)
    } else {
      setCurrentPage(pageInput)
    }
  }
  function handlePageInput(e) {
    setPageInput(e.target.value)
  }

  return (
    <Console w="100%">
      <Flex justifyContent={"space-between"}>
        <Heading size="lg">
          {isRegistered
            ? "✅Your Axie Team is Ready!"
            : "📜Select 3 Axies to Register!"}
        </Heading>
        <Flex>
          {isRegistering && <Loading width="40px" />}
          <Button
            variant="primary"
            onClick={isRegistered ? unregister : register}
            isDisabled={
              isRegistering ||
              (registeringAxies.length !== 3 && registeredAxies.length !== 3)
            }
          >
            {isRegistered ? "♻️ UNREGISTER" : "🔒 REGISTER"}
          </Button>
        </Flex>
      </Flex>

      <AxieTeam
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
        registeredAxies={registeredAxies}
        setRegisteredAxies={setRegisteredAxies}
        registeringAxies={registeringAxies}
        setRegisteringAxies={setRegisteringAxies}
      />

      <Divider p="10px 0" />

      <Flex justifyContent="space-between" w="100%" wrap="wrap" p="10px 0">
        <Heading size="lg">Total Axies : {axieList?.length}</Heading>
        <Flex alignItems="center">
          <IconButton
            variant="primary"
            size="sm"
            aria-label="Previous Page."
            onClick={() => {
              setCurrentPage((prev) => (prev <= 1 ? 1 : prev - 1))
              setPageInput((prev) => (prev <= 1 ? 1 : prev - 1))
            }}
            mr="5px"
          >
            <ChevronLeftIcon boxSize={6} />
          </IconButton>
          <Box mr="5px">Page</Box>
          <Tooltip
            placement="top"
            label={<Console>Press enter to change the page.</Console>}
          >
            <form onSubmit={updatePage}>
              <Input
                type="number"
                bg="gray.800"
                w="100px"
                value={pageInput}
                onChange={handlePageInput}
              />
            </form>
          </Tooltip>
          <Flex className="centerFlex">
            <Box m="0px 5px 0px 5px">of {pages.length}</Box>
          </Flex>
          <IconButton
            variant="primary"
            size="sm"
            aria-label="Next Page."
            ml="5px"
            onClick={() => {
              setCurrentPage((prev) =>
                prev >= pages.length ? pages.length : prev + 1
              )
              setPageInput((prev) =>
                prev >= pages.length ? pages.length : prev + 1
              )
            }}
          >
            <ChevronRightIcon boxSize={6} />
          </IconButton>
        </Flex>
      </Flex>
      {!loading ? (
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="10px">
          {axieList
            .slice((currentPage - 1) * perPage, currentPage * perPage)
            .map((axie, index) => (
              <GridItem
                key={index + "_axieCard2"}
                display="flex"
                justifyContent={"center"}
              >
                <AxieCard
                  registeredAxies={registeredAxies}
                  registeringAxies={registeringAxies}
                  setRegisteringAxies={setRegisteringAxies}
                  axie={axie}
                />
              </GridItem>
            ))}
        </SimpleGrid>
      ) : (
        <Loading width="150px" />
      )}
    </Console>
  )
}
