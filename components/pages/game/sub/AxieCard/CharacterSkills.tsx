import { SimpleGrid, GridItem, Image } from "@chakra-ui/react"
import { getClassBorder } from "../../../../../lib/utils/axieFeatures/colors"
import { getAxieGameStats } from "../../../../../lib/utils/axieFeatures/stats"

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
      <GridItem
        border="1px solid black"
        p="2px"
        borderRadius="5px"
        bg="purple.200"
        colSpan={1}
      >
        {props.axie.bodyShape}
      </GridItem>
      <GridItem
        border={"2px solid " + getClassBorder(props.axie.class)}
        p="2px"
        borderRadius="5px"
        bg="cyan.100"
        colSpan={1}
      >
        {props.axie.class}
      </GridItem>
      <GridItem
        border="1px solid black"
        p="2px"
        borderRadius="5px"
        bg="red.200"
        colSpan={1}
      >
        ❤️ {getAxieGameStats(props.axie.class, props.axie.bodyShape).hp}
      </GridItem>
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
          src="/images/icons/shield_icon.png"
          width="14px"
          height="14px"
          mt="2px"
          mr="3px"
        />
        {`${
          getAxieGameStats(props.axie.class, props.axie.bodyShape).armorFlat
        }+${
          getAxieGameStats(props.axie.class, props.axie.bodyShape).armorPerc
        }%`}
      </GridItem>
      <GridItem
        border="1px solid black"
        p="2px"
        borderRadius="5px"
        bg="yellow.200"
        colSpan={1}
      >
        ⚡ {getAxieGameStats(props.axie.class, props.axie.bodyShape).moveSpeed}
      </GridItem>
      <GridItem
        border="1px solid black"
        p="2px"
        borderRadius="5px"
        bg="green.200"
        colSpan={1}
      >
        🩹 {getAxieGameStats(props.axie.class, props.axie.bodyShape).hpRegen}
      </GridItem>
    </SimpleGrid>
  )
}
