import Navbar from "./navbar"
import Footer from "./Footer"
import { Container, Flex } from "@chakra-ui/react"
import { DESIGN_MAX_WIDTH } from "../../styles/theme"
import Console from "../common/Console"

export default function Layout({ children }) {
  return (
    <Flex>
      <Navbar />
      <Container
        p="0px!important"
        m="100px auto"
        maxW={DESIGN_MAX_WIDTH * 0.96}
        w="96%"
      >
        {children}
      </Container>
      <Footer />
    </Flex>
  )
}
