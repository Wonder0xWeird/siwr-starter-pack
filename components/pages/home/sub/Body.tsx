import React from "react"
import {
  Text,
  Heading,
  UnorderedList,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  List,
} from "@chakra-ui/react"

export default function Body() {
  return (
    <Accordion w="100%">
      <AccordionItem borderRadius={"30px"} overflow="hidden">
        <AccordionButton textShadow="0 2px 4px rgba(0, 0, 0, 0.3)">
          <Heading size="md" textAlign="left">
            What is this?
          </Heading>
        </AccordionButton>
        <AccordionPanel>
          <List spacing={2}>
            <ListItem>
              This Sign In With Ronin (SIWR) Starter Package is designed to
              serve as a web application template to help streamline the
              on-boarding of new developers to the Ronin Network, an
              EVM-compatible sidechain of the Ethereum Blockchain!
            </ListItem>
            <ListItem>
              {" "}
              It was built with 💖 by wonder.eth as an adaptation/extension of
              the{" "}
              <a
                href="https://login.xyz/"
                style={{ textDecoration: "underline" }}
              >
                Sign In With Ethereum (SIWE)
              </a>{" "}
              protocol and integrates tools from across the crypto, Axie, and
              Ronin developer ecosystem.
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem borderRadius={"30px"} overflow="hidden">
        <AccordionButton textShadow="0 2px 4px rgba(0, 0, 0, 0.3)">
          <Heading size="md" textAlign="left">
            What does it contain?
          </Heading>
        </AccordionButton>

        <AccordionPanel>
          <Text pb={2}>
            The SIWR Starter Pack contains a set of full stack web development
            tools and guidelines to help developers get their products and
            services up and running on Ronin, including:
          </Text>

          <UnorderedList spacing={2}>
            <ListItem ml="30px">
              Secure connection to the Ronin Network via a user's Ronin Wallet -
              configured to use{" "}
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
              for direct wallet interactions.
            </ListItem>

            <ListItem ml="30px">
              Integration with{" "}
              <a
                href="https://docs.ethers.org/v5/"
                style={{ textDecoration: "underline" }}
              >
                ethers.js v5
              </a>{" "}
              for Ronin contract interactions.
            </ListItem>

            <ListItem ml="30px">
              Integration with the{" "}
              <a
                href="https://axie-graphql.web.app/"
                style={{ textDecoration: "underline" }}
              >
                Axie GraphQL server
              </a>{" "}
              for retrieval of assets from users' Ronin wallet.
            </ListItem>

            <ListItem ml="30px">
              Runs on the React-based, full stack web app development framework{" "}
              <a
                href="https://nextjs.org/"
                style={{ textDecoration: "underline" }}
              >
                Next.js
              </a>
              .
            </ListItem>

            <ListItem ml="30px">
              Server-side account creation and session management with{" "}
              <a
                href="https://next-auth.js.org/"
                style={{ textDecoration: "underline" }}
              >
                NextAuth.js
              </a>
              .
            </ListItem>

            <ListItem ml="30px">
              Project-specific data model manipulations and persistence with{" "}
              <a
                href="https://www.mongodb.com/"
                style={{ textDecoration: "underline" }}
              >
                MongoDB
              </a>{" "}
              and{" "}
              <a
                href="https://mongoosejs.com/"
                style={{ textDecoration: "underline" }}
              >
                Mongoose.js
              </a>
              .
            </ListItem>
            <ListItem ml="30px">
              Simple, automated web app deployment and hosting with{" "}
              <a
                href="https://vercel.com/"
                style={{ textDecoration: "underline" }}
              >
                Vercel
              </a>{" "}
              and Git repository integration.
            </ListItem>
            <ListItem ml="30px">
              Frontend design principles and theming with the{" "}
              <a
                href="https://chakra-ui.com/"
                style={{ textDecoration: "underline" }}
              >
                Chakra UI
              </a>{" "}
              component library integration.
            </ListItem>
            <ListItem ml="30px">TypeScript ready!</ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem borderRadius={"30px"} overflow="hidden">
        <AccordionButton textShadow="0 2px 4px rgba(0, 0, 0, 0.3)">
          <Heading size="md" textAlign="left">
            How do I get started?
          </Heading>
        </AccordionButton>
        <AccordionPanel>
          <List spacing={2}>
            <ListItem>
              Getting started is as easy as heading to the{" "}
              <a
                href="https://github.com/Wonder0xWeird/siwr-starter-pack"
                style={{ textDecoration: "underline" }}
              >
                SIWR Starter Pack
              </a>{" "}
              repo to fork/clone it to your local dev environment, and start
              hacking!
            </ListItem>
            <ListItem>
              As a template, this package is designed to provide a solid first
              step for new developers on Ronin, but do not hesitate to
              update/modify any part to suit your needs!
            </ListItem>
            <ListItem>
              Newer developers can also follow alongisde THIS TUTORIAL to help
              understand how to configure this package to run on your own live
              staging environment.
            </ListItem>
            <ListItem>
              For those interested in contributing to the SIWR Starter Pack, the
              github repo is accepting pull requests!
            </ListItem>
            <ListItem>
              As a final note, this code base also contains a top level
              siwr.config.ts file that helps configure Ronin wallet interactions
              for projects before and after they are allow-listed by Sky Mavis.
              Once allow-listed, switching to direct wallet interactions and
              transaction signing is as simple as a single config switch!
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
