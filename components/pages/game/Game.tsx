import React from "react"
import axios from "axios"
import { Button, Divider, Flex, Heading } from "@chakra-ui/react"

import { IRegisteredAxie } from "../../../lib/backend/mongo/models/schemas/registeredAxies"
import { IAxie } from "../../../lib/frontend/graphQueries"
import Loading from "../../common/Loading"
import Console from "../../common/Console"
import AxieTeam from "./sub/AxieTeam"
import AxieList from "./sub/AxieList"

export default function Game(props) {
  const [registeringAxies, setRegisteringAxies] = React.useState<
    IAxie[] | IRegisteredAxie[]
  >([])
  const [registeredAxies, setRegisteredAxies] = React.useState<
    IRegisteredAxie[]
  >([])
  const [isRegistering, setIsRegistering] = React.useState<boolean>(false)
  const [isRegistered, setIsRegistered] = React.useState<boolean>(false)

  async function register() {
    setIsRegistering(true)
    await axios
      .post("/api/inventory/register", registeringAxies)
      .then(async (result) => {
        console.log("result.data.data:", result.data.data)
        setRegisteredAxies(result.data.data)
        setRegisteringAxies([])
        setIsRegistered(true)
        setIsRegistering(false)
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error registering axies:", err.response.data)
          alert(err.response.data.message)
        }
        setIsRegistering(false)
      })
  }

  async function unregister() {
    setIsRegistering(true)
    await axios
      .post("/api/inventory/unregister")
      .then(async (result) => {
        if (result.data.statusCode === 200) {
          setIsRegistered(false)
          setRegisteredAxies([])
          setRegisteringAxies(registeredAxies)
        }
        setIsRegistering(false)
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error getting axies:", err.response.data)
        }
        setIsRegistering(false)
      })
  }

  return (
    <Console w="100%">
      <Flex justifyContent={"space-between"} wrap="wrap" w="100%">
        <Heading size="lg">
          {isRegistered
            ? "✅Your Axie Team is Ready!"
            : "📜Select 3 Axies to Register!"}
        </Heading>
        <Flex align="flex-end">
          {isRegistering && <Loading width="40px" />}
          <Button
            variant="primary"
            onClick={isRegistered ? unregister : register}
            isDisabled={
              isRegistering ||
              (registeringAxies.length !== 3 && registeredAxies.length !== 3)
            }
          >
            {isRegistered ? "♻️ UNREGISTER" : "🔒 REGISTER"}
          </Button>
        </Flex>
      </Flex>

      <AxieTeam
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
        registeredAxies={registeredAxies}
        setRegisteredAxies={setRegisteredAxies}
        registeringAxies={registeringAxies}
        setRegisteringAxies={setRegisteringAxies}
      />

      <Divider p="10px 0" />

      <AxieList
        userAddress={props.user.address}
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
        registeredAxies={registeredAxies}
        setRegisteredAxies={setRegisteredAxies}
        registeringAxies={registeringAxies}
        setRegisteringAxies={setRegisteringAxies}
      />
    </Console>
  )
}
