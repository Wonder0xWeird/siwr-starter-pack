import { Box, Flex, GridItem, Image, Tooltip, VStack } from "@chakra-ui/react"
import {
  getClassBg,
  getClassBorder,
} from "../../../../lib/utils/axieFeatures/colors"
import { getPartAssets } from "../../../../lib/utils/axieFeatures/parts"

import { SKILL_DATA } from "../../../../lib/utils/axieFeatures/skills"

export default function AxieV3Card({ part }) {
  const { image, icon } = getPartAssets(part)

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
          <Image src={image} loading="lazy" h="150px" w="180px" />
        </Box>
        <VStack
          position="absolute"
          bottom="0"
          h="170px"
          w="100%"
          bgGradient={getClassBg(part.class)}
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
              <Image src={icon} loading="lazy" h="25px" w="25px" />
            </Box>
            <Box fontWeight="800" fontSize="13px" ml="43px" color="#eee">
              {part.name}
            </Box>
          </Flex>
          <Box
            fontSize="10px"
            textAlign="center"
            w="98%"
            h="160px"
            color="#eee"
          >
            {SKILL_DATA.find(
              (skill) =>
                skill.skillName.toLowerCase() === part.name.toLowerCase()
            )?.skillDescription || "Sorry, this skill is not yet available."}
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
