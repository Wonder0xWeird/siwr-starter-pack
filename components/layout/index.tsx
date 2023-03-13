import Navbar from "./navbar"
import Footer from "./Footer"
import { Container, Flex } from "@chakra-ui/react"

export default function Layout({ children }) {
  return (
    <Flex w="100%">
      <Navbar />
      <Container maxWidth="1350px" p="0px!important" mt="75px" mb="40px">
        {children}
      </Container>
      <Footer />
    </Flex>
  )
}
