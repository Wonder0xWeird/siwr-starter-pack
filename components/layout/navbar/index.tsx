import React from "react"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"

import windowWidth from "../../../lib/frontend/hooks/window"
import { getConnectionDetails } from "../../../lib/frontend/wallet"
import DesktopNav from "./sub/DesktopNav"
import MobileNav from "./sub/MobileNav"

export default function Navbar() {
  const router = useRouter()
  const currentPage = router.pathname.split("/")[1]
  const navBarBreakPoint = 599

  async function connectToRonin() {
    console.log("Ronin Wallet Connected")
    const connectRequestBody = await getConnectionDetails()
    if (!connectRequestBody) {
      return
    }
    if (connectRequestBody < 0) {
      alert("Ronin wallet is not installed!")
      return
    }

    await signIn("ronin", connectRequestBody).then((result) => {
      console.log("Sign In Result:", result)
      if (result.status === 200) {
        router.push("/account")
      } else {
        console.log(result.error)
      }
    })
  }

  return windowWidth(navBarBreakPoint) ? (
    <DesktopNav currentPage={currentPage} connectToRonin={connectToRonin} />
  ) : (
    <MobileNav currentPage={currentPage} connectToRonin={connectToRonin} />
  )
}
