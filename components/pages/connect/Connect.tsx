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
import { signIn } from "next-auth/react"
import { useBreakpointValue } from "@chakra-ui/react"

import Splash from "./sub/Splash"
import PasswordInput from "../../common/PasswordInput"
import { getConnectionDetails } from "../../../lib/frontend/wallet"

interface ICredentials {
  username: string
  password: string
}

export default function Connect() {
  const colSpan = useBreakpointValue({ base: 2, md: 1 })

  const router = useRouter()

  const [loginInput, setLoginInput] = React.useState<ICredentials>({
    username: "",
    password: "",
  })
  const [isLoggingIn, setIsLoggingIn] = React.useState(false)

  async function siwr() {
    setIsLoggingIn(true)
    console.log("Sign In With Ronin Initiated...")
    const connectRequestBody = await getConnectionDetails()
    if (!connectRequestBody) {
      setIsLoggingIn(false)
      return
    }
    if (connectRequestBody < 0) {
      alert("Ronin wallet is not installed!")
      setIsLoggingIn(false)
      return
    }

    await signIn("ronin", connectRequestBody).then((result) => {
      console.log("Sign In Result:", result)
      if (result.status === 200) {
        router.push("/game/register")
        setIsLoggingIn(false)
      } else {
        console.log(result.error)
        setIsLoggingIn(false)
      }
    })
  }

  async function login() {
    setIsLoggingIn(true)
    if (loginInput.username === "" || loginInput.password === "") {
      alert("Your username and password fields may not be empty.")
      setIsLoggingIn(false)
      return
    } else {
      const loginRequestBody = {
        username: loginInput.username,
        password: loginInput.password,
        redirect: false,
      }
      await signIn("login", loginRequestBody).then((result) => {
        console.log("Sign In Result:", result)
        if (result.status === 200) {
          router.push("/game/register")
        } else {
          console.log(result.error)
          alert("Invalid credentials")
          setIsLoggingIn(false)
        }
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
    <VStack>
      <Splash />

      <VStack
        w="full"
        h="full"
        p={10}
        spacing={10}
        alignItems="flex-start"
        className={isLoggingIn && "borderChange"}
      >
        {isLoggingIn ? (
          <Heading>Signing In!</Heading>
        ) : (
          <Heading size="2xl">Login</Heading>
        )}
        <Text>
          Once connected to your Ronin Wallet, you will be directed to create a
          DoLL username & password which you may use to login here and in the
          DoLL game client.
        </Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={2}>
          <FormControl>
            <Button size="lg" w="full" onMouseUp={siwr} disabled={isLoggingIn}>
              Connect Ronin Wallet
            </Button>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2} marginTop={10}>
          <Text>
            Return users may connect via Ronin or their username and password.
          </Text>
        </GridItem>
        <GridItem colSpan={colSpan}>
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
        <GridItem colSpan={colSpan}>
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
              size="lg"
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
  )
}
