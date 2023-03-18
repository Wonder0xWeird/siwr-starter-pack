import { Box, Flex } from "@chakra-ui/react"

export default function RegisterError(props) {
  return (
    <Box position="absolute">
      <Flex left={-props.scrollPos} className="registerError" zIndex="8" alignItems="center" justifyContent="center" borderRadius="30px" position="relative" bg={"#EEEEEE"} w="250px" h="250px" border="4px solid red">
        <Box position="relative" textAlign="center" fontWeight="800" color="black">{props.error}</Box>
      </Flex>
    </Box>
  )
}
