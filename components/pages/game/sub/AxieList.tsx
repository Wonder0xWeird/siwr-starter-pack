import React from "react"
import {
  Box,
  Flex,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Tooltip,
  IconButton,
  VStack,
} from "@chakra-ui/react"

import AxieCard from "./AxieCard"
import Loading from "../../../common/Loading"
import Console from "../../../common/Console"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { IRegisteredAxie } from "../../../../lib/backend/mongo/models/schemas/registeredAxies"
import axios from "axios"
import { getAxieBriefList, IAxie } from "../../../../lib/frontend/graphQueries"

export default function AxieList(props) {
  const [axieList, setAxieList] = React.useState<IAxie[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  const [perPage, setPerPage] = React.useState<number>(12)
  const [pages, setPages] = React.useState<number[]>([])
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [pageInput, setPageInput] = React.useState<number>(1)

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
    props.setRegisteredAxies(registeredAxies)
    props.setIsRegistered(registeredAxies.length === 3)

    const foundAxieList: IAxie[] = await getAxieBriefList(props.userAddress)
    setAxieList(foundAxieList)

    const numPages = Math.ceil(foundAxieList.length / perPage) ?? 0
    setPages(Array.from(Array(numPages).keys()))

    setLoading(false)
  }

  function updatePage(e) {
    e.preventDefault()
    if (pageInput < 1) {
      setPageInput(1)
      setCurrentPage(1)
    } else if (pageInput > props.pages.length) {
      setPageInput(props.pages.length)
      setCurrentPage(props.pages.length)
    } else {
      setCurrentPage(pageInput)
    }
  }
  function handlePageInput(e) {
    setPageInput(e.target.value)
  }

  return (
    <VStack p="10px 0">
      <Flex justifyContent="space-between" w="100%" wrap="wrap">
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

      <Flex>
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
                    registeredAxies={props.registeredAxies}
                    registeringAxies={props.registeringAxies}
                    setRegisteringAxies={props.setRegisteringAxies}
                    axie={axie}
                    hover
                  />
                </GridItem>
              ))}
          </SimpleGrid>
        ) : (
          <Loading width="150px" />
        )}
      </Flex>
    </VStack>
  )
}
