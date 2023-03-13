import React from "react"
import Head from "next/head"
import theme from "../styles/theme"
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import "../styles/global.css"
import { AppProps } from "next/app"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session} refetchInterval={0}>
        <Head>
          {/* Primary Meta Tags */}
          <title>SIWR Starter Pack</title>
          <link rel="icon" type="image/x-icon" href="/images/ronin-logo.svg" />
          <meta name="title" content="Sign In With Ronin" />
          <meta name="description" content="Build on the Ronin Network!" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://doll.tioland.com/" />
          <meta property="og:title" content="Sign In With Ronin" />
          <meta
            property="og:description"
            content="Build on the Ronin Network!"
          />
          <meta property="og:image" content="/images/ronin-logo-text.png" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:url" content="https://doll.tioland.com/" />
          <meta property="twitter:title" content="Sign In With Ronin" />
          <meta
            property="twitter:description"
            content="Build on the Ronin Network!"
          />
          {/* Twitter image must be a absolute url */}
          <meta property="twitter:image" content="/images/" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}
