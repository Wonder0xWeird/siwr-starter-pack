import { Box, Flex, Image } from "@chakra-ui/react"

import styles from "./loading.module.css"

export default function Loading({ width = "25px" }) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box className="centerFlex" width={width} height={width} display="flex">
        <Image className={styles.loader} w={width} src="/images/loading.png" />
      </Box>
    </Flex>
  )
}
