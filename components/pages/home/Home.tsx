import React from "react"
import {
  VStack,
  Flex,
  Heading,
  Text,
  Image,
  ListItem,
  UnorderedList,
  Tooltip,
} from "@chakra-ui/react"
import Console from "../../common/Console"
import { DESIGN_MAX_WIDTH } from "../../../styles/theme"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  return (
    <Console
      p="0"
      m="auto"
      maxW={DESIGN_MAX_WIDTH * 0.96}
      w="96%"
      overflow={"hidden"}
      alignItems="center"
      header
    >
      <VStack w="75%" m="auto" spacing={5}>
        <Flex w={"100%"} alignItems={"center"} justifyContent="space-around">
          <Image src="/images/ronin-3d.png" w="200px" />
          <VStack>
            <Heading size="lg">Welcome to the</Heading>
            <Heading size="3xl">Sign In With Ronin</Heading>
            <Heading size="2xl">Starter Pack!</Heading>
          </VStack>
        </Flex>
        <VStack alignItems={"flex-start"} spacing={5}>
          <Heading size="md">What is this?</Heading>
          <Text>
            This package was built with 💖 by{" "}
            {/* <Tooltip
              placement="top"
              closeDelay={500}
              label={
                <Console display={"flex"} justifyContent="space-between">
                  <Image mr="5px" w="25px" src="/images/icons/ronin-logo.svg" />
                  <Image w="25px" src="/images/icons/ethereum.svg" />
                </Console>
              }
            >
              <span style={{ textDecoration: "underline" }}>w0nd3r.eth</span>
            </Tooltip>{" "} */}
            wonder.eth as an adaptation of the{" "}
            <a
              href="https://login.xyz/"
              style={{ textDecoration: "underline" }}
            >
              Sign In With Ethereum (SIWE)
            </a>{" "}
            protocol to help streamline the on-boarding of new developers to the
            Ronin Network!
          </Text>
          <Heading size="md">What does it contain?</Heading>
          <Text>
            This Sign In With Ronin (SIWR) starter pack contains a set of full
            stack web development tools and guidelines to help developers get
            their products and services up and running on Ronin, including:
          </Text>
          <UnorderedList>
            <ListItem ml="30px">
              Secure connection to the Ronin Network via a user's Ronin Wallet -
              uses{" "}
              <a
                href="https://cookbook.axie.live/developers-cookbook/axiedao-sso"
                style={{ textDecoration: "underline" }}
              >
                Axie DAO's Single Sign On
              </a>{" "}
              process until you can get your domain allow-listed with{" "}
              <a
                href="https://www.skymavis.com/"
                style={{ textDecoration: "underline" }}
              >
                Sky Mavis
              </a>{" "}
              .
            </ListItem>

            <ListItem ml="30px">
              Secure account creation and session management with{" "}
              <a
                href="https://next-auth.js.org/"
                style={{ textDecoration: "underline" }}
              >
                NextAuth.js
              </a>
              .
            </ListItem>
            <ListItem ml="30px">
              Full stack web app development with the React-based framework{" "}
              <a
                href="https://nextjs.org/"
                style={{ textDecoration: "underline" }}
              >
                Next.js
              </a>
              .
            </ListItem>
            <ListItem ml="30px">
              Simple automated web app deployment and hosting with{" "}
              <a
                href="https://vercel.com/"
                style={{ textDecoration: "underline" }}
              >
                Vercel
              </a>{" "}
              and Git repository integration.
            </ListItem>
            <ListItem ml="30px">
              Frontend design principles and theming with component library
              integration.
            </ListItem>
            <ListItem ml="30px">TypeScript ready!</ListItem>
          </UnorderedList>
          <Heading size="md">How do I get started?</Heading>
          <Text>
            Head to the{" "}
            <a
              href="https://github.com/Wonder0xWeird/siwr-starter-pack"
              style={{ textDecoration: "underline" }}
            >
              SIWR Starter Pack
            </a>{" "}
            repo, fork/clone it to your local dev environment, and start
            hacking!
          </Text>
          <Text></Text>
        </VStack>
      </VStack>
      <Image
        src="/images/ronin-network-splash.png"
        cursor={"pointer"}
        onClick={() => router.push("https://docs.roninchain.com/")}
      />
    </Console>
  )
}
