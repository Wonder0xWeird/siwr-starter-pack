import {
  Box,
  VStack,
  SimpleGrid,
  GridItem,
  Image,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react"
import { getClassBorder } from "../../../../lib/utils/axieFeatures"

export default function CharacterSkills(props) {
  return (
    <SimpleGrid
      fontSize="11px"
      textAlign="center"
      spacingX={"2px"}
      spacingY={"2px"}
      columns={2}
      width="100%"
      color="black"
    >
      <Tooltip label="Body Shape" borderRadius="5px">
        <GridItem
          border="1px solid black"
          p="2px"
          borderRadius="5px"
          bg="purple.200"
          colSpan={1}
        >
          {props.axie.bodyShape}
        </GridItem>
      </Tooltip>
      <Tooltip label="Axie Class" borderRadius="5px">
        <GridItem
          border={"2px solid " + getClassBorder(props.axie.class)}
          p="2px"
          borderRadius="5px"
          bg="cyan.100"
          colSpan={1}
        >
          {props.axie.class}
        </GridItem>
      </Tooltip>
      <Tooltip label="Total HP" borderRadius="5px">
        <GridItem
          border="1px solid black"
          p="2px"
          borderRadius="5px"
          bg="red.200"
          colSpan={1}
        >
          ❤️ {props.axie.stats.hp}
        </GridItem>
      </Tooltip>
      <Tooltip label="Armor" borderRadius="5px">
        <GridItem
          border="1px solid black"
          p="2px"
          borderRadius="5px"
          bg="blue.200"
          colSpan={1}
          display="flex"
          justifyContent="center"
        >
          <Image
            src="/images/shield_icon.png"
            width="14px"
            height="14px"
            mt="2px"
            mr="3px"
          />
          {`${props.axie.stats.armorFlat}+${props.axie.stats.armorPerc}%`}
        </GridItem>
      </Tooltip>
      <Tooltip label="Movement Speed" borderRadius="5px">
        <GridItem
          border="1px solid black"
          p="2px"
          borderRadius="5px"
          bg="yellow.200"
          colSpan={1}
        >
          ⚡ {props.axie.stats.moveSpeed}
        </GridItem>
      </Tooltip>
      <Tooltip label="HP Regeneration" borderRadius="5px">
        <GridItem
          border="1px solid black"
          p="2px"
          borderRadius="5px"
          bg="green.200"
          colSpan={1}
        >
          🩹 {props.axie.stats.hpRegen}
        </GridItem>
      </Tooltip>
    </SimpleGrid>
  )
}
