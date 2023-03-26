import React from "react"
import { useRouter } from "next/router"
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
} from "@chakra-ui/react"
import { signIn, SignInOptions } from "next-auth/react"

import PasswordInput from "../../common/PasswordInput"
import { siwr } from "../../../lib/frontend/wallet"
import Console from "../../common/Console"

export interface ILoginRequestBody extends SignInOptions {
  username: string
  password: string
  callbackUrl: string
}

export default function Connect() {
  const [loginInput, setLoginInput] = React.useState<ILoginRequestBody>({
    username: "",
    password: "",
    callbackUrl: "/account",
  })
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false)

  async function login() {
    setIsLoggingIn(true)
    if (loginInput.username === "" || loginInput.password === "") {
      alert("Your username and password fields may not be empty.")
      setIsLoggingIn(false)
      return
    } else {
      const loginRequestBody: ILoginRequestBody = {
        username: loginInput.username,
        password: loginInput.password,
        callbackUrl: "/account",
      }
      await signIn("login", loginRequestBody).then((result) => {
        console.log("Sign In Result:", result)
        if (result?.error) {
          console.log(result.error)
          alert("Invalid credentials")
        }
        setIsLoggingIn(false)
      })
    }
  }

  function handleInput(e) {
    setLoginInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Console w="fit-content" m="auto">
      <VStack
        p={"10px"}
        spacing={5}
        alignItems="flex-start"
        className={isLoggingIn && "borderChange"}
      >
        <Heading>{isLoggingIn ? "Signing In!" : "Login"}</Heading>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={2} textAlign="center">
            <FormControl>
              <Button
                variant={"primary"}
                w="full"
                onMouseUp={siwr}
                disabled={isLoggingIn}
              >
                Connect Ronin Wallet
              </Button>
            </FormControl>
            <Text fontSize={"12px"} style={{ opacity: 0.5 }}>
              After connecting, new users will be directed to create a username
              & password.
            </Text>
          </GridItem>

          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={loginInput.username}
                onChange={handleInput}
                type="text"
                placeholder="Username..."
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <PasswordInput
                name="password"
                value={loginInput.password}
                onChange={handleInput}
                placeholder="Password..."
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <Button
                variant={"primary"}
                w="full"
                onMouseUp={login}
                disabled={isLoggingIn ? true : false}
              >
                Login
              </Button>
            </FormControl>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Console>
  )
}
