import {
  Box,
  Flex,
  GridItem,
  Heading,
  Image,
  Tooltip,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import {
  CLASS_TO_PART_MAP,
  SPECIAL_PART_MAPPING,
} from "../../../../lib/utils/axieFeatures"

import { SKILL_DATA } from "../../../../lib/utils/axieFeatures"

export default function AxiePart(props) {
  const partClass = props.part.class.toLowerCase()
  const partType = props.part.type.toLowerCase()
  let partName = props.part.name

  let partTypeURL = ""
  let partClassURL = ""
  switch (partType) {
    case "back":
      partTypeURL = "Back Cards Art"
      partClassURL = props.part.class
      break
    case "ears":
      partTypeURL = "Ear Cards Art"
      partClassURL = `${props.part.class} Ears`
      break
    case "eyes":
      partTypeURL = "Eye Cards Art"
      partClassURL =
        props.part.class === "Aquatic"
          ? "Aqua Eyes"
          : `${props.part.class} Eyes`
      break
    case "horn":
      partTypeURL = "Horn Cards Art"
      partClassURL = props.part.class
      break
    case "mouth":
      partTypeURL = "Mouth Cards Art"
      partClassURL = props.part.class
      break
    case "tail":
      partTypeURL = "Tail Cards Art"
      partClassURL = `${props.part.class} Tails`
      break
  }

  const partsObj = CLASS_TO_PART_MAP[partClass][partType]
  const isSpecial = SPECIAL_PART_MAPPING[props.part.id]

  if (isSpecial) {
    let firstWord = isSpecial.split("-")[1]
    let secondWord = isSpecial.split("-")[2] ? isSpecial.split("-")[2] : ""
    firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1)

    if (secondWord != "") {
      secondWord = secondWord.charAt(0).toUpperCase() + secondWord.slice(1)
      partName = firstWord + " " + secondWord
    } else {
      partName = firstWord
    }
  }

  const partBinary = Object.keys(partsObj).find(
    (key) => partsObj[key].global === partName
  )
  const partInt = parseInt(partBinary, 2)
  const partString = partInt >= 10 ? `${partInt}` : `0${partInt}`
  const partImage = `/images/Cards/${partTypeURL}/${partClassURL}/${`${partClass}-${partType}-${partString}`}.png`
  const typeImage = `/images/Cards/Generic/${partType}.png`

  /** Get a different color for the border surrounding the axie's skills */
  function getClassBorder(axieClass) {
    switch (axieClass) {
      case "Aquatic":
        return "#039BE5"
      case "Plant":
        return "#7CB342"
      case "Beast":
        return "#FDD835"
      case "Bird":
        return "#D81B60"
      case "Reptile":
        return "#8E24AA"
      case "Bug":
        return "#E53935"
    }
  }
  /** Get a different color for the border surrounding the axie's skills */
  function getClassBg(axieClass) {
    switch (axieClass) {
      case "Aquatic":
        return "linear-gradient(to bottom, rgba(0,0,0,0), #01579B, #01579B, #01579B, #01579B)"
      case "Plant":
        return "linear-gradient(to bottom, rgba(0,0,0,0), #33691E, #33691E, #33691E, #33691E)"
      case "Beast":
        return "linear-gradient(to bottom, rgba(0,0,0,0), #F57F17, #F57F17, #F57F17, #F57F17)"
      case "Bird":
        return "linear-gradient(to bottom, rgba(0,0,0,0), #880E4F, #880E4F, #880E4F, #880E4F)"
      case "Reptile":
        return "linear-gradient(to bottom, rgba(0,0,0,0), #4A148C, #4A148C, #4A148C, #4A148C)"
      case "Bug":
        return "linear-gradient(to bottom, rgba(0,0,0,0), #B71C1C, #B71C1C, #B71C1C, #B71C1C)"
    }
  }

  function AxieV3Card() {
    return (
      <Box
        borderRadius="10px"
        border="1px solid"
        borderColor="gray.500"
        w="160px"
        h="250px"
      >
        <Box
          position="relative"
          borderRadius="10px"
          border="3px solid"
          borderColor="gray.300"
          w="100%"
          h="100%"
          overflow="hidden"
        >
          <Box position="absolute" borderRadius="10px" w="160px">
            <Image src={partImage} loading="lazy" h="150px" w="180px" />
          </Box>
          <VStack
            position="absolute"
            bottom="0"
            h="170px"
            w="100%"
            bgGradient={getClassBg(props.part.class)}
          >
            <Flex
              mt="35px"
              alignItems="center"
              justifyContent="flex-start"
              w="90%"
              position="relative"
            >
              <Box
                position="absolute"
                p="3px"
                bg="gray.300"
                borderRadius="50%"
                zIndex="100"
              >
                <Image src={typeImage} loading="lazy" h="25px" w="25px" />
              </Box>
              <Box fontWeight="800" fontSize="13px" ml="43px" color="#eee">
                {props.part.name}
              </Box>
            </Flex>
            <Box
              fontSize="10px"
              textAlign="center"
              w="98%"
              h="160px"
              color="#eee"
            >
              {!SKILL_DATA.find(
                (skill) =>
                  skill.skillName.toLowerCase() ===
                  props.part.name.toLowerCase()
              )
                ? "Sorry, this skill is not yet available in DoLL"
                : SKILL_DATA.find(
                    (skill) =>
                      skill.skillName.toLowerCase() ===
                      props.part.name.toLowerCase()
                  ).skillDescription}
            </Box>
          </VStack>
        </Box>
      </Box>
    )
  }

  const partKey = `${props.axieId}_${props.part.name}_${props.index}`
  const borderWidth = "2px"
  const borderSpec = `${borderWidth} solid ${getClassBorder(props.part.class)}`

  return (
    <Tooltip bg="none" label={<AxieV3Card />} placement="top">
      <GridItem
        border={borderSpec}
        key={partKey}
        minH="90px"
        height="100%"
        backgroundImage={"url('" + partImage + "')"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        borderRadius="5px"
        backgroundSize="cover"
        textShadow="rgb(0 0 0) 0px 1px 4px, rgb(0 0 0) 0px 3px 10px"
      >
        <VStack
          justifyContent={"space-between"}
          height="100%"
          w="100%"
          bg="rgba(0,0,0,0.2)"
        >
          <Box fontSize="11px" fontWeight="800" color="white">
            {props.part.name}
          </Box>
          <Box m="0px!important" fontSize="10px" color="white">
            Level {props.part.level ?? "?"}
          </Box>
        </VStack>
      </GridItem>
    </Tooltip>
  )
}
