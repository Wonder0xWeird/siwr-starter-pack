import {
  Box,
  Button,
  Flex,
  GridItem,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"

import styles from "./register.module.css"
import Waiting from "../../../common/Loading"
import AxieCard from "./AxieCard"
import Loading from "../../../common/Loading"

export default function AxieCardsViewer(props) {
  const [filters, setFilters] = React.useState(null)

  const [selectedList, setSelectedList] = React.useState([])

  const [selectedStatFilter, setSelectedStatFilter] =
    React.useState("No Stat Filter Set")
  const [selectedClass, setSelectedClass] = React.useState("Class")
  const [selectedBodyShape, setSelectedBodyShape] = React.useState("Body Shape")
  const [selectedName, setSelectedName] = React.useState("")

  const [waiting, setWaiting] = React.useState(true)
  const [processing, setProcessing] = React.useState(false)

  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageInput, setPageInput] = React.useState(1)

  React.useEffect(() => {
    if (props.axieList !== null) {
      let classes = [...props.axieList.map((axie) => axie.class)].filter(
        (item) => item != null
      )
      let bodyShapes = [...props.axieList.map((axie) => axie.bodyShape)].filter(
        (item) => item != null
      )
      setFilters({ classes: classes, bodyShapes: bodyShapes })

      setSelectedList(props.axieList)
      setWaiting(false)
    }
  }, [props.axieList])

  function filterAxies(byThis, value) {
    let isClass = false
    let isBodyShape = false
    let isName = false

    if (byThis === "Class") {
      isClass = true
    } else if (byThis === "Body Shape") {
      isBodyShape = true
    } else if (byThis === "Name") {
      isName = true
    }

    let classVar = isClass ? value : selectedClass
    let bodyShapeVar = isBodyShape ? value : selectedBodyShape
    let nameVar = isName ? value : selectedName

    let selectedListMaker = props.axieList

    if (classVar !== "Class") {
      selectedListMaker = selectedListMaker.filter(
        (axie) => axie.class === classVar
      )
    }

    if (bodyShapeVar !== "Body Shape") {
      selectedListMaker = selectedListMaker.filter(
        (axie) => axie.bodyShape === bodyShapeVar
      )
    }

    if (nameVar !== "") {
      selectedListMaker = selectedListMaker.filter((axie) =>
        axie.name.toLowerCase().includes(nameVar.toLowerCase())
      )
    }

    return selectedListMaker
  }

  async function handleInput(e) {
    setProcessing(true)
    const timeOutId = setTimeout(() => {
      if (e.target.value !== selectedName) {
        const tempSelectedName = e.target.value
        const filteredList = filterAxies("Name", tempSelectedName)
        setSelectedName(tempSelectedName)
        setSelectedList(filteredList)
        setProcessing(false)
      } else {
        clearTimeout(timeOutId)
      }
    }, 1000)
  }
  function handlePageInput(e) {
    setPageInput(e.target.value)
  }

  function updatePage(e) {
    e.preventDefault()
    setProcessing(true)
    if (pageInput < 1) {
      setPageInput(1)
      setCurrentPage(1)
    } else if (pageInput > getPages().length) {
      setPageInput(getPages().length)
      setCurrentPage(getPages().length)
    } else {
      setCurrentPage(pageInput)
    }
    setProcessing(false)
  }

  function changeClass(e) {
    setProcessing(true)
    const timeOutId = setTimeout(() => {
      const tempSelectedClass = e.target.innerHTML.replace("<!-- -->", "")
      const filteredList = filterAxies("Class", tempSelectedClass)
      setSelectedClass(tempSelectedClass)
      setSelectedList(filteredList)
      setProcessing(false)
      clearTimeout(timeOutId)
    }, 500)
  }
  function changeBodyShape(e) {
    setProcessing(true)
    const timeOutId = setTimeout(() => {
      const tempSelectedBodyShape = e.target.innerHTML.replace("<!-- -->", "")
      const filteredList = filterAxies("Body Shape", tempSelectedBodyShape)
      setSelectedBodyShape(tempSelectedBodyShape)
      setSelectedList(filteredList)
      setProcessing(false)
      clearTimeout(timeOutId)
    }, 500)
  }

  async function changeStatSorting(e) {
    setProcessing(true)

    const tempSelectedStatFilter = e.target.innerHTML.replace("<!-- -->", "")
    setSelectedStatFilter(tempSelectedStatFilter)

    switch (tempSelectedStatFilter) {
      case "HP Descending":
        await setSelectedList(
          selectedList.sort((a, b) => b.stats.hp - a.stats.hp)
        )
        break
      case "HP Ascending":
        await setSelectedList(
          selectedList.sort((a, b) => a.stats.hp - b.stats.hp)
        )
        break
      case "Armor Descending":
        await setSelectedList(
          selectedList.sort((a, b) => b.stats.armorPerc - a.stats.armorPerc)
        )
        break
      case "Armor Ascending":
        await setSelectedList(
          selectedList.sort((a, b) => a.stats.armorPerc - b.stats.armorPerc)
        )
        break
      case "Speed Descending":
        await setSelectedList(
          selectedList.sort(
            (a, b) =>
              b.stats.moveSpeed.split("%")[0] - a.stats.moveSpeed.split("%")[0]
          )
        )
        break
      case "Speed Ascending":
        await setSelectedList(
          selectedList.sort(
            (a, b) =>
              a.stats.moveSpeed.split("%")[0] - b.stats.moveSpeed.split("%")[0]
          )
        )
        break
      case "HP Regen Descending":
        await setSelectedList(
          selectedList.sort((a, b) => b.stats.hpRegen - a.stats.hpRegen)
        )
        break
      case "HP Regen Ascending":
        await setSelectedList(
          selectedList.sort((a, b) => a.stats.hpRegen - b.stats.hpRegen)
        )
        break
    }
    setProcessing(false)
  }

  //Constant to determine the number of rows to be displayed per page
  const perPage = 20

  /**
   * Creates an array of page numbers [1,2,3,4,5,...x] where 'x' is the total number of pages based on # of matches and matches per page
   * @returns [1,2,3,4,5...x]
   */
  function getPages() {
    const numPages = selectedList ? Math.ceil(selectedList.length / perPage) : 0
    let pages = []
    for (let i = 0; i < numPages; i++) {
      pages.push(i + 1)
    }
    return pages
  }
  /**
   * Sets the page in state so that we can return the appropriate subset of the data based on the getPages
   * @param e OnClick event handler
   */
  function setPage(e) {
    setCurrentPage(e.target.innerHTML)
  }

  return (
    <>
      <Flex
        className={styles.axieFilter + " centerFlex"}
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        rowGap="5px"
      >
        {processing && (
          <Box w="50px" h="50px" mr="20px">
            <Loading width="70%" />
          </Box>
        )}

        <Input
          className={styles.nameInput}
          bg={useColorModeValue("white", "gray.800")}
          placeholder="Enter Axie Name"
          fontSize="14px"
          onChange={handleInput}
        />
        <Menu>
          <MenuButton
            as={Button}
            m="0px 5px 0px 5px"
            variant="registration"
            fontSize="14px"
          >
            {selectedClass}
          </MenuButton>
          <MenuList>
            <MenuItem key={"_axieClass"} onClick={changeClass} fontSize="14px">
              Class
            </MenuItem>
            {filters &&
              filters.classes.map((axieClass) => (
                <MenuItem
                  key={`${axieClass}_axieClass`}
                  id={`${axieClass}`}
                  onClick={changeClass}
                  fontSize="14px"
                >
                  {axieClass}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            m="0px 5px 0px 5px"
            variant="registration"
            fontSize="14px"
          >
            {selectedBodyShape}
          </MenuButton>
          <MenuList>
            <MenuItem
              key={"_axieBodyShape"}
              onClick={changeBodyShape}
              fontSize="14px"
            >
              Body Shape
            </MenuItem>
            {filters &&
              filters.bodyShapes.map((axieBodyShape) => (
                <MenuItem
                  key={`${axieBodyShape}_axieBodyShape`}
                  id={`${axieBodyShape}`}
                  onClick={changeBodyShape}
                >
                  {axieBodyShape}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            fontSize="14px"
            m="0px 5px 0px 5px"
            variant="registration"
          >
            {selectedStatFilter}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={changeStatSorting} fontSize="14px">
              HP Descending
            </MenuItem>
            <MenuItem
              fontSize="14px"
              borderBottom="1px solid black"
              onClick={changeStatSorting}
            >
              HP Ascending
            </MenuItem>
            <MenuItem onClick={changeStatSorting} fontSize="14px">
              Armor Descending
            </MenuItem>
            <MenuItem
              fontSize="14px"
              borderBottom="1px solid black"
              onClick={changeStatSorting}
            >
              Armor Ascending
            </MenuItem>
            <MenuItem onClick={changeStatSorting} fontSize="14px">
              Speed Descending
            </MenuItem>
            <MenuItem
              fontSize="14px"
              borderBottom="1px solid black"
              onClick={changeStatSorting}
            >
              Speed Ascending
            </MenuItem>
            <MenuItem onClick={changeStatSorting} fontSize="14px">
              HP Regen Descending
            </MenuItem>
            <MenuItem onClick={changeStatSorting} fontSize="14px">
              HP Regen Ascending
            </MenuItem>
          </MenuList>
        </Menu>

        <Flex ml={{ base: "0px", sm: "5px" }} className="centerFlex">
          <Button
            mr="5px"
            fontSize="24px"
            onClick={() => {
              setCurrentPage((prev) => (prev <= 1 ? 1 : prev - 1))
              setPageInput((prev) => (prev <= 1 ? 1 : prev - 1))
            }}
          >
            <Box height="35px">{"<"}</Box>
          </Button>
          <Box mr="5px">Page</Box>
          <Tooltip placement="top" label="Press enter to change pages">
            <form onSubmit={updatePage}>
              <Input
                className={styles.pageInput}
                type="number"
                fontSize="14px"
                bg={useColorModeValue("white", "gray.800")}
                value={pageInput}
                onChange={handlePageInput}
              />
            </form>
          </Tooltip>
          <Flex className="centerFlex">
            <Box m="0px 5px 0px 5px">of</Box>
            <Box fontSize="14px">{getPages().length}</Box>
          </Flex>
          <Button
            ml="5px"
            fontSize="24px"
            onClick={() => {
              setCurrentPage((prev) =>
                prev >= getPages().length ? getPages().length : prev + 1
              )
              setPageInput((prev) =>
                prev >= getPages().length ? getPages().length : prev + 1
              )
            }}
          >
            <Box height="35px">{">"}</Box>
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={8}>
        <GridItem minW="200px" minH="415px" colSpan={8}>
          {!waiting ? (
            <SimpleGrid
              className={styles.axieList2}
              id="axielist"
              columns={{ base: 1, sm: 1, md: 2, xl: 3, "2xl": 4 }}
              spacing="10px"
            >
              {selectedList
                .slice((currentPage - 1) * perPage, currentPage * perPage)
                .map(
                  (axie, index) =>
                    axie.class != null && (
                      <GridItem key={index + "_axieCard2"}>
                        <AxieCard
                          registeredAxies={props.registeredAxies}
                          registeringAxies={props.registeringAxies}
                          setRegisteringAxies={props.setRegisteringAxies}
                          axie={axie}
                        />
                      </GridItem>
                    )
                )}
            </SimpleGrid>
          ) : (
            <Waiting key={"Waiting"} width="150px" />
          )}
        </GridItem>
      </SimpleGrid>
      <Flex
        ml={{ base: "0px", sm: "5px" }}
        className="centerFlex"
        mt="20px!important"
      >
        <Button
          mr="5px"
          fontSize="24px"
          onClick={() => {
            setCurrentPage((prev) => (prev <= 1 ? 1 : prev - 1))
            setPageInput((prev) => (prev <= 1 ? 1 : prev - 1))
          }}
        >
          <Box height="35px">{"<"}</Box>
        </Button>
        <Box mr="5px">Page</Box>
        <Tooltip placement="top" label="Press enter to change pages">
          <form onSubmit={updatePage}>
            <Input
              className={styles.pageInput}
              type="number"
              fontSize="14px"
              bg={useColorModeValue("white", "gray.800")}
              value={pageInput}
              onChange={handlePageInput}
            />
          </form>
        </Tooltip>
        <Flex className="centerFlex">
          <Box m="0px 5px 0px 5px">of</Box>
          <Box fontSize="14px">{getPages().length}</Box>
        </Flex>
        <Button
          ml="5px"
          fontSize="24px"
          onClick={() => {
            setCurrentPage((prev) =>
              prev >= getPages().length ? getPages().length : prev + 1
            )
            setPageInput((prev) =>
              prev >= getPages().length ? getPages().length : prev + 1
            )
          }}
        >
          <Box height="35px">{">"}</Box>
        </Button>
      </Flex>
    </>
  )
}
