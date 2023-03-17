import React from "react"
import { useRouter } from "next/router"
import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
} from "@chakra-ui/react"
import { signOut } from "next-auth/react"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Console from "../../common/Console"
import { sliceRoninAddress } from "../../../lib/utils/wallet"

export default function Account(props) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  return (
    <Console w="fit-content" m="auto">
      <VStack spacing={"20px"}>
        <Heading>
          {isLoggingOut ? "See You Later!" : `Welcome ${props.user.username}!`}
        </Heading>
        <Text>
          Connected account:{" "}
          <strong>{sliceRoninAddress(props.user.address)}</strong>
        </Text>

        <SimpleGrid
          columns={2}
          columnGap={3}
          rowGap={6}
          justifyContent={"center"}
          display="flex"
        >
          <GridItem colSpan={1}>
            <Button
              variant="primary"
              onMouseUp={() => router.push("/account/update")}
              disabled={!isLoggingOut}
            >
              Update Account
            </Button>
          </GridItem>

          <GridItem colSpan={1}>
            <Button
              variant="primary"
              disabled={isLoggingOut}
              onMouseUp={async () => {
                const isMobile =
                  navigator.maxTouchPoints ||
                  "ontouchstart" in document.documentElement
                if (isMobile) {
                  const provider = new WalletConnectProvider({
                    bridge: "https://bridge.walletconnect.org",
                    rpc: { "2020": "https://api.roninchain.com/rpc" },
                    qrcode: false,
                  })
                  await provider.disconnect()
                }
                signOut()
                setIsLoggingOut(true)
              }}
            >
              Sign Out
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Console>
  )
}
