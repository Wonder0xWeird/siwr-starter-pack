import { Html, Head, Main, NextScript } from "next/document"
import React from "react"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "../styles/theme"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link href="fonts/PixelTCG.ttf" rel="stylesheet" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
