import {
  Image,
  Flex,
  Button,
  Collapse,
  Slide,
  Box,
  VStack,
  IconButton,
} from "@chakra-ui/react"
import { BellIcon, TriangleUpIcon } from "@chakra-ui/icons"
import Console from "../../../common/Console"
import React from "react"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

import Banner from "./Banner"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { sliceRoninAddress } from "../../../../lib/utils/wallet"

export default function MobileNav({ currentPage, connectToRonin }) {
  const [showNav, setShowNav] = React.useState<boolean>(false)
  const [showBanner, setShowBanner] = React.useState<boolean>(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <Box zIndex={99999} position="fixed" w="98%" ml="1%">
      <Box bg="gray.700" borderRadius={"0 0 32px 32px"} pt="5px">
        <Console borderRadius={"32px"}>
          <Flex justifyContent="space-between" w="100%" alignItems="center">
            <Image
              cursor={"pointer"}
              src="/images/icons/ronin-logo.svg"
              maxW={"100px"}
              onClick={() => router.push("/")}
            />
            <Button
              onClick={() => setShowNav((showNav) => !showNav)}
              variant="primary"
            >
              <Image src={"/images/icons/hamburger.svg"} w="30px" h="30px" />
            </Button>
            <IconButton
              variant="primary"
              size="xs"
              onClick={() => setShowBanner((showBanner) => !showBanner)}
              aria-label="Banner Notification"
              icon={showBanner ? <TriangleUpIcon /> : <BellIcon />}
              position="absolute"
              right="0"
              bottom="-10px"
            />
          </Flex>

          <Collapse in={showNav} unmountOnExit>
            <Flex justifyContent={"space-between"} p="5px 5px 10px 0">
              {status === "authenticated" ? (
                <>
                  <VStack spacing={4} alignItems="flex-start">
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
                  </VStack>
                  <VStack spacing={4}>
                    <Button
                      variant={
                        currentPage === "account" ? `navSelected` : `nav`
                      }
                      onClick={() => router.push("/account")}
                    >
                      💖 Account
                    </Button>

                    <Button variant="navSelected">
                      <Image
                        src={"/images/icons/ronin-logo.svg"}
                        w="25px"
                        mr="2px"
                      />
                      {`${sliceRoninAddress(session.user.address, 3)}`}
                    </Button>

                    <Button
                      variant="primary"
                      alignSelf="flex-end"
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
                  </VStack>
                </>
              ) : (
                <Flex justifyContent="flex-end" w="full">
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
          </Collapse>
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
