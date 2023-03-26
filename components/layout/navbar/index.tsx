import React from "react"
import { useRouter } from "next/router"

import { siwr } from "../../../lib/frontend/wallet"
import useWindowWidth from "../../../lib/frontend/hooks/window"
import DesktopNav from "./sub/DesktopNav"
import MobileNav from "./sub/MobileNav"

export default function Navbar() {
  const router = useRouter()
  const currentPage = router.pathname.split("/")[1]
  const navBarBreakPoint = 599

  return useWindowWidth(navBarBreakPoint) ? (
    <DesktopNav currentPage={currentPage} siwr={siwr} />
  ) : (
    <MobileNav currentPage={currentPage} siwr={siwr} />
  )
}
