import {
  Box,
  Button,
  Flex,
  VStack,
  SimpleGrid,
  GridItem,
  Container,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react"

import styles from "./common-components.module.css"

export default function Loading(props) {
  let width
  if (props.width) {
    width = props.width
  } else {
    width = "25px"
  }

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        className="centerFlex"
        width={width}
        height={width}
        // bg={useColorModeValue("rgba(94,190,255, 0.3)", "")}
        // border={useColorModeValue("2px solid rgba(94,190,255, 0.4)", "")}
        display="flex"
        // borderRadius="50%"
      >
        <Image
          className={styles.loadingScreen}
          w={width}
          src="/images/puff-loading.png"
        />
      </Box>
    </Flex>
  )
}
