import { Box, GridItem, Tooltip, VStack } from "@chakra-ui/react"
import { getClassBorder } from "../../../../../lib/utils/axieFeatures/colors"
import { getPartAssets } from "../../../../../lib/utils/axieFeatures/parts"
import AxieV3Card from "./AxieV3Card"

export default function AxiePart(props) {
  const { image } = getPartAssets(props.part)

  const partKey = `${props.axieId}_${props.part.name}_${props.index}`

  return (
    <Tooltip bg="none" label={<AxieV3Card part={props.part} />} placement="top">
      <GridItem
        border={`2px solid ${getClassBorder(props.part.class)}`}
        key={partKey}
        minH="90px"
        height="100%"
        backgroundImage={"url('" + image + "')"}
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
          <Box fontSize="11px" fontWeight="800" color="#eee">
            {props.part.name}
          </Box>
          <Box m="0px!important" fontSize="10px" color="#eee">
            Level {props.part.level ?? "?"}
          </Box>
        </VStack>
      </GridItem>
    </Tooltip>
  )
}
