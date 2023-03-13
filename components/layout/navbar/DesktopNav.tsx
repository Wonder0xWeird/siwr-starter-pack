import {
  Image,
  Flex,
  Button,
  Slide,
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
} from "@chakra-ui/react"
import { BellIcon, TriangleUpIcon } from "@chakra-ui/icons"
import Console from "../../common/Console"
import React from "react"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

import Banner from "./Banner"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { sliceRoninAddress } from "../../../lib/utils/wallet"

export default function DesktopNav({ currentPage, connectToRonin }) {
  const [showBanner, setShowBanner] = React.useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <Box zIndex={99999} position="fixed" w="98%" ml="1%">
      <Box bg="gray.700" borderRadius={"0 0 32px 32px"} pt="5px">
        <Console maxW="1400px" m="auto" mt="5px" borderRadius="32px">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pos={"relative"}
          >
            <Image
              src="/images/ronin-logo-text.png"
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
            <Flex w="100%">
              <Flex columnGap={5}>
                {status === "authenticated" ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant={
                        currentPage === "game" ? `navLinkCurrent` : `navLink`
                      }
                    >
                      🎮 Game
                    </MenuButton>
                    <MenuList fontSize={"16px"}>
                      <MenuItem
                        onClick={() => router.push("/game/instructions")}
                      >
                        📜 Instructions
                      </MenuItem>
                      <MenuItem onClick={() => router.push("/game/register")}>
                        📜 Register
                      </MenuItem>

                      {/* <MenuItem
                    onClick={() => router.push("/game/levelup")}
                  >
                    🎲 Level Up
                  </MenuItem> */}

                      <MenuItem onClick={() => router.push("/game/enlist")}>
                        🏹 Enlist
                      </MenuItem>

                      <MenuItem onClick={() => router.push("/account")}>
                        <Image
                          src={"/images/turnipshield.png"}
                          width="30px"
                          height="30px"
                          float="left"
                          mr="7px"
                        />{" "}
                        Buy Shields
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Button
                    variant={
                      currentPage === "game" ? `navLinkCurrent` : `navLink`
                    }
                    onClick={() => router.push("/game/instructions")}
                  >
                    🎮 Game
                  </Button>
                )}
              </Flex>

              <Menu>
                <MenuButton
                  as={Button}
                  variant={
                    currentPage === "leaderboard" ? `navLinkCurrent` : `navLink`
                  }
                >
                  🏆 Leaderboards
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push("/leaderboard")}>
                    🌎 Global Leaderboard
                  </MenuItem>
                  <MenuItem onClick={() => router.push("/leaderboard/angels")}>
                    👼 Lunacian Angels
                  </MenuItem>
                </MenuList>
              </Menu>

              <Button
                variant={
                  currentPage === "contests" ? `navLinkCurrent` : `navLink`
                }
                onClick={() => router.push("/contests")}
              >
                🌈 Contests
              </Button>

              {status === "authenticated" && (
                <Flex>
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant={
                        currentPage === "sidekicks"
                          ? `navLinkCurrent`
                          : `navLink`
                      }
                    >
                      ⚔️ Sidekicks
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => router.push("/account?tab=sidekicks")}
                      >
                        My Sidekicks
                      </MenuItem>
                      <MenuItem onClick={() => router.push("/sidekicks")}>
                        🛍️ Gen2 Store
                      </MenuItem>
                      <MenuItem
                        onClick={() => router.push("/sidekicks/tracker")}
                      >
                        ⚽ Gen2 Tracker
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  {(session.user.role === "admin" ||
                    session.user.role === "VIP") && (
                    <Button
                      p="0px"
                      variant={
                        currentPage === "GODMODE" ? `navLinkCurrent` : `navLink`
                      }
                      onClick={() => router.push("/GODMODE")}
                    >
                      ⚡
                    </Button>
                  )}
                </Flex>
              )}
            </Flex>

            {status === "authenticated" ? (
              <Flex alignItems="center">
                <Button
                  variant={
                    currentPage === "account" ? `navLinkCurrent` : `navLink`
                  }
                  onClick={() => router.push("/account")}
                >
                  💖 Account
                </Button>

                <Button variant="navLinkCurrent" bg="rgba(2, 158, 255, 0.1)">
                  <Image src={"/images/ronin-logo.svg"} w="25px" mr="2px" />
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
                  SIGN OUT
                </Button>
              </Flex>
            ) : (
              <Flex justifyContent="space-between">
                <Button
                  variant={
                    currentPage === "connect" ? `navLinkCurrent` : `navLink`
                  }
                  onClick={() => router.push("/connect")}
                >
                  🌟 LOGIN 🌟
                </Button>

                <Button variant="primary" onClick={connectToRonin}>
                  <Image src={"/images/ronin-logo.svg"} w="25px" mr="2px" />
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
        style={{ position: "absolute", marginTop: "70px", zIndex: -1 }}
      >
        <Banner />
      </Slide>
    </Box>
  )
}
