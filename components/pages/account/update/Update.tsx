import React from "react"
import { useRouter } from "next/router"
import axios from "axios"
import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useColorModeValue } from "@chakra-ui/react"
import { signIn } from "next-auth/react"

import PasswordInput from "../../../common/PasswordInput"
import Console from "../../../common/Console"
import { sliceRoninAddress } from "../../../../lib/utils/wallet"

interface UserInput {
  username: string
  password: string
  passwordConf: string
}

const initialUserInput: UserInput = {
  username: "",
  password: "",
  passwordConf: "",
}

export default function Update(props) {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50")

  const router = useRouter()

  const isAccountCreation = props.user.username ? false : true

  const [input, setInput] = React.useState<UserInput>(initialUserInput)
  const [isLoading, setIsLoading] = React.useState(false)

  // Controls <Input> elements for Username, Password and Confirm Password fields
  function handleInput(e) {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  async function createOrUpdate() {
    console.log("Input:", input)
    if (input.username === "") {
      alert("You must enter a username to proceed.")
      return
    } else if (input.password === "" || input.passwordConf === "") {
      alert("You must enter a password and renter it to proceed.")
      return
    } else if (input.password !== input.passwordConf) {
      alert("Your passwords do not match.")
      return
    }

    setIsLoading(true)

    const createOrUpdateAccountRequest = {
      username: input.username,
      password: input.password,
      passwordConf: input.passwordConf,
    }

    axios
      .post("/api/account/update", createOrUpdateAccountRequest)
      .then(async (result) => {
        if (result.data.statusCode === 200) {
          const loginBody = {
            username: result.data.data.username,
            password: input.password,
            redirect: false,
          }

          await signIn("login", loginBody).then((result) => {
            console.log("Sign In Result:", result)
          })

          alert("Account updated successfully!")

          // router.push("/account");
          router.push("/account")
        } else {
          console.log("failure")
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error creating account:", error.response.data)
          alert(error.response.data.message)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Console
      maxW={"1000px"}
      w="fit-content"
      m="auto"
      alignSelf={"center"}
      position="relative"
    >
      <VStack spacing={"20px"} mb="20px">
        <Button
          variant="primary"
          position={"absolute"}
          left="10px"
          onClick={() => router.push("/account")}
        >
          <Image w="20px" src="/images/icons/arrow-left.svg" />
        </Button>
        <Heading>
          {isAccountCreation ? "Create Account" : "Update Account"}
        </Heading>
        <Text width="100%" textAlign="center">
          Connected account:{" "}
          <strong>{sliceRoninAddress(props.user.address)}</strong>
        </Text>
        <Text>
          {isAccountCreation
            ? "Welcome Roninite! Please create a username and password for yourself."
            : `Updating account: ${props.user.username}`}
        </Text>

        <SimpleGrid
          columns={1}
          columnGap={6}
          rowGap={6}
          w="full"
          maxW={"500px"}
        >
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>
                Username{" "}
                <span style={{ opacity: 0.5, fontSize: "12px" }}>
                  16 character maximum, case sensitive
                </span>
              </FormLabel>
              <Input
                name="username"
                value={input.username}
                onChange={handleInput}
                maxLength={16}
                placeholder="Username..."
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>
                Password{" "}
                <span style={{ opacity: 0.5, fontSize: "12px" }}>
                  8 character minimum, case sensitive
                </span>
              </FormLabel>
              <PasswordInput
                name="password"
                value={input.password}
                onChange={handleInput}
                placeholder="Password..."
                minLength={8}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <PasswordInput
                name="passwordConf"
                value={input.passwordConf}
                onChange={handleInput}
                placeholder="Renter Password..."
                minLength={8}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <Button
                variant="primary"
                w="full"
                onMouseUp={createOrUpdate}
                disabled={isLoading ? true : false}
              >
                {isAccountCreation ? "Create Account" : "Update Account"}
              </Button>
            </FormControl>
          </GridItem>
        </SimpleGrid>
      </VStack>
      {!isAccountCreation && (
        <Text maxW={"500px"} style={{ opacity: 0.5 }} fontSize="12px">
          🚨NOTE🚨 All information entered above will be used to update your
          account.
          <br />
          <br />
          In order keep your current username or password, please enter their
          current value before submitting.
        </Text>
      )}
    </Console>
  )
}
