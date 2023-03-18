import { Box, Flex, Image } from "@chakra-ui/react"

import styles from "./loading.module.css"

export default function Loading({ width }) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        className="centerFlex"
        width={width || "25px"}
        height={width || "25px"}
        display="flex"
      >
        <Image className={styles.loader} w={width} src="/images/loading.png" />
      </Box>
    </Flex>
  )
}
