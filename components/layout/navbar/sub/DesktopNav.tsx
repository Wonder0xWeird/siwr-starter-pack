import { Image, Flex, Button, Slide, Box, IconButton } from "@chakra-ui/react"
import { BellIcon, TriangleUpIcon } from "@chakra-ui/icons"
import Console from "../../../common/Console"
import React from "react"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

import Banner from "./Banner"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { sliceRoninAddress } from "../../../../lib/utils/wallet"
import { DESIGN_MAX_WIDTH } from "../../../../styles/theme"

export default function DesktopNav({ currentPage, connectToRonin }) {
  const [showBanner, setShowBanner] = React.useState<boolean>(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <Box zIndex={99999} position="fixed" w="98%" ml="1%">
      <Box bg="gray.700" borderRadius={"0 0 32px 32px"} pt="5px">
        <Console maxW={DESIGN_MAX_WIDTH} m="auto" borderRadius="32px">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pos={"relative"}
          >
            <Image
              src="/images/icons/ronin-logo.svg"
              mr="10px"
              maxW={"100px"}
              onClick={() => router.push("/")}
              cursor="pointer"
            />
            <IconButton
              variant="primary"
              size="xs"
              onClick={() => setShowBanner((showBanner) => !showBanner)}
              aria-label="Banner Notification"
              icon={showBanner ? <TriangleUpIcon /> : <BellIcon />}
              position="absolute"
              right="-15px"
              bottom="-20px"
            />
            {status === "authenticated" && (
              <Flex w="100%">
                <Button
                  variant={currentPage === "game" ? `navSelected` : `nav`}
                  onClick={() => router.push("/game")}
                >
                  🎮 Game
                </Button>

                {/* <Button
                  variant={currentPage === "pageName" ? `navSelected` : `nav`}
                  onClick={() => router.push("/pageName")}
                >
                  ✨ Nav Button
                </Button> */}
              </Flex>
            )}

            {status === "authenticated" ? (
              <Flex alignItems="center">
                <Button
                  variant={currentPage === "account" ? `navSelected` : `nav`}
                  onClick={() => router.push("/account")}
                >
                  💖 Account
                </Button>

                <Button variant="navSelected" bg="rgba(2, 158, 255, 0.1)">
                  <Image
                    src={"/images/icons/ronin-logo.svg"}
                    w="25px"
                    mr="2px"
                  />
                  {`${sliceRoninAddress(session.user.address, 3)}`}
                </Button>
                <Button
                  ml="10px"
                  variant="primary"
                  onClick={async () => {
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
                    await signOut()
                    router.push("/")
                  }}
                >
                  Sign Out
                </Button>
              </Flex>
            ) : (
              <Flex justifyContent="space-between">
                <Button
                  variant={currentPage === "connect" ? `navSelected` : `nav`}
                  onClick={() => router.push("/connect")}
                >
                  🌟 LOGIN 🌟
                </Button>

                <Button variant="primary" onClick={connectToRonin}>
                  <Image
                    src={"/images/icons/ronin-logo.svg"}
                    w="25px"
                    mr="2px"
                  />
                  Connect
                </Button>
              </Flex>
            )}
          </Flex>
        </Console>
      </Box>
      <Slide
        in={showBanner}
        unmountOnExit
        direction="top"
        style={{ position: "absolute", marginTop: "75px", zIndex: -1 }}
      >
        <Banner />
      </Slide>
    </Box>
  )
}
