# <p align="center"> ![SIWR logo](https://siwr-starter-pack.vercel.app/images/icons/ronin-logo.svg) Sign In With Ronin ![SIWR logo](https://siwr-starter-pack.vercel.app/images/icons/ronin-logo.svg) </p>

## <p align="center">Welcome to the Sign In With Ronin Starter Pack!</p>

## What is this?

This Sign In With Ronin (SIWR) Starter Package serves as a web application template to help onboard new developers to the <a href="https://roninchain.com/">Ronin Network</a>, an EVM-compatible sidechain of the Ethereum Blockchain!

This package was built with 💖 by <a href="https://twitter.com/wonder0xweird">wonder.eth<a> as an adaptation/extension of the <a href="https://login.xyz/">Sign In With Ethereum (SIWE)<a> protocol and integrates tools from across the crypto, Axie Infinity, and Ronin developer ecosystems.

At its core, SIWR exposes a set of pre-defined functions for logging a user into a website by signing a cryptographic message with their <a href="https://wallet.roninchain.com/">Ronin wallet</a>, but also integrates several layers of web tooling to generate a full stack web app template on top of this core functionality.

Try out a live demo of the <a href="https://siwr-starter-pack.vercel.app/">SIWR Starter Pack<a>!

## What does it contain?

The SIWR Starter Pack contains a set of full stack web development tools and guidelines to help developers get their products and services up and running on Ronin, including:

- Secure connection to the Ronin Network via a user's Ronin Wallet -
  configured to use
  <a
                href="https://cookbook.axie.live/developers-cookbook/axiedao-sso"
              >
  Axie DAO's Single Sign On
  </a>
  process until you can get your domain
  <a
                href="https://docs.roninchain.com/docs/developer-guide/integrate-ronin-wallet"
              >
  allowlisted
  </a>
  with
  <a
                href="https://www.skymavis.com/"
              >
  Sky Mavis
  </a>
  for direct wallet interactions.
- Integration with
  <a
                href="https://docs.ethers.org/v5/"
              >
  ethers.js v5
  </a>
  for Ronin blockchain interactions.
- Integration with the
  <a
                href="https://axie-graphql.web.app/"
              >
  Axie GraphQL server
  </a>
  for retrieval of assets from users' Ronin wallet.
- Runs on the React-based, full stack web app development framework
  <a
                href="https://nextjs.org/"
              >
  Next.js
  </a>
  .
- Server-side account creation and session management with
  <a
                href="https://next-auth.js.org/"
              >
  NextAuth.js
  </a>
  .
- Project-specific data model manipulations and persistence with
  <a
                href="https://www.mongodb.com/"
              >
  MongoDB
  </a>
  and
  <a
                href="https://mongoosejs.com/"
              >
  Mongoose.js.
  </a>
  .
- Simple, automated web app deployment and hosting with
  <a
                href="https://vercel.com/"
              >
  Vercel
  </a>
  and Git repository integration.
- Frontend design principles and theming with the
  <a
                href="https://chakra-ui.com/"
              >
  Chakra UI
  </a>
  component library integration.
- TypeScript ready!

## How do I get started?

Getting started hacking the SIWR Starter Pack template is as easy as forking/cloning this repo to your local dev environment!

As a template, this package is designed to provide a solid first step for new developers on Ronin, but do not hesitate to update/modify/remove any part to suit your needs!

Newer developers can also follow alongside <a
                href="https://weirdtheway.medium.com/getting-started-with-the-sign-in-with-ronin-starter-pack-68c45eff484a"
              >
this tutorial
</a> to help them understand how to configure this package to run on your own local dev, live dev, and production environments.

For those interested in contributing to the SIWR Starter Pack, this GitHub repo is accepting pull requests!

<br>

# Documentation

## SIWR Config

The configuration settings for SIWR's core functionality, managing signature signing with the <a href="https://wallet.roninchain.com/">Ronin wallet</a> for secure user login, are found in the `siwr.config.ts` file found in the top level of this package's directory:

```
const CONNECT_TO_SAIGON_TESTNET = false

const chainId = CONNECT_TO_SAIGON_TESTNET ? "2021" : "2020"
const roninJsonRpcUrl = CONNECT_TO_SAIGON_TESTNET
  ? "https://saigon-testnet.roninchain.com/rpc"
  : "https://api.roninchain.com/rpc"

const siwrConfig = {
  allowListed: false,
  connectToSaigon: CONNECT_TO_SAIGON_TESTNET,
  chainId: chainId,
  roninJsonRpcUrl: roninJsonRpcUrl,
  treasuryAddress: "ronin:...",
}

export default siwrConfig

```

The code block defines and exports a configuration object, `siwrConfig`, to configure the Ronin wallet interface to your web app.

By default, the `allowListed` property is set to false, indicating your project does not yet have direct read or write access to the <a href="https://roninchain.com/">Ronin Blockchain</a>. In this case, your application will use the <a
                href="https://cookbook.axie.live/developers-cookbook/axiedao-sso"
              >
Axie DAO's Single Sign On
</a> process to authenticate a user via their Ronin wallet.

However, once your project is <a
                href="https://docs.roninchain.com/docs/developer-guide/integrate-ronin-wallet"
              >
allowlisted
</a> by <a
                href="https://www.skymavis.com/"
              >
Sky Mavis
</a>, switching your web app to direct wallet interaction and transaction signing is as easy as a single config switch!

That said, the local development domain http://localhost:3000 is allowlisted by default, so developers can still test contract signing from their Ronin wallet locally - setting `allowListed` to `true` will enable the creation of an ethers.js contract signer interface with a user's Ronin wallet for you to test this out (be sure to refresh your page or redploy the live version after switching the configuration).

The CONNECT_TO_SAIGON_TESTNET constant determines whether the configuration should be set up to connect to the Saigon testnet or the main Ronin network, and is used to dynamically define the `chainId` and `roninJsonRpcUrl` values used in various wallet functions.

ANYBODY may write EVM-compatible smart contracts and deploy them onto the Saigon Testnet and test contract function interactions locally by toggling the CONNECT_TO_SAIGON_TESTNET constant to `true` (more content on how to set up a Hardhat environment to write smart contracts for Ronin coming soon!).

Finally, the `treasuryAddress` property is defined as an initial payment reciever for token transfers from sales of products and services through your web app (note that payment infrastructure has not yet been built into the SIWR template, but is also coming soon!).

<br>

## <a href="https://nextjs.org/" >Next.js</a> Framework and SIWR Directory Structure

Next.js is a full stack, React-based web development framework comprising a large set of tools to accelerate the building of beautiful, multi-page websites.

The directory structure of the SIWR Starter Pack is built upon Next.js, enabling developers to easily define pages, serverless API endpoints, and public/static file storage, along with the integration of many more simple yet powerful tools across the web stack. Check out their awesome documentation to learn more!

Be sure to also check out the `pages/_document.tsx` and `pages/_app.tsx` files within the SIWR template to see how Next handles your site's metadata, as well as the `<ChakraProvider theme={theme}>` and `<SessionProvider session={session} refetchInterval={0}>` components which wrap the SIWR template to manage Chakra components/theme and NextAuth server-side session management. More info on these below.

In addition to Next's default directory, the SIWR Starter Pack also includes a `components/` directory to manage React components used on various pages, a `lib/` directory which holds the library of utilities used across the SIWR stack, and a `sytles/` directory which holds the `global.css` and `theme.ts` files.

<br>

## <a href="https://next-auth.js.org/" >NextAuth.js</a> + SIWR Authentication and Authorization

NextAuth.js is a powerful, open-source authentication tool for Next.js applications which handles server-side session management.

SIWR integrates NextAuth by defining a set of custom authentication credentials including a uniquely defined message, server-generated nonce, and cryptographic message signature for the blockchain-enabled authentication workflow.

The `siwr()` function defined in the `lib/frontend/wallet.ts` directory handles the instantiation of the Ronin wallet interface and message signature, either via the Axie DAO SSO proxy or directly with the user's Ronin wallet (browser extension, or mobile app), and sends the generated credentials to the server for authentication.

The `pages/api/auth/[...nextauth].ts` file defines the authentication API endpoint which recieves the signed credentials and validates them before generating a <a href="https://jwt.io/" >JSON Web Token (JWT)</a> to manage the session by storing and presenting the user's public Ronin address, username, and role across the Next.js stack.

Check out the other api endpoints in the `pages/api/` directory to get a sense for how to access the session token within an API endpoint on the backend to handle server-side authorization or other session-based checks.

<br>

## <a href="https://chakra-ui.com/" >Chakra UI</a> Theming, and the `<Console>` Component

The Chakra UI component library contains a large set of functional React components which help developers build beatiful web apps quickly.

The SIWR Starter Pack uses several of Chakra UI' pre-built components to manage the layout and animations of various pages - I recommend scanning through their component library to see what else you might be able to make use of!

Additionally, the `styles/theme.ts` file defines the properties of the SIWR template's custom design. Use this as a guide for how to customize the theme to fit your own project's color palette and design principles.

Lastly, a `<Console>` component is defined in the `components/common/' directory as a custom designed component that extends the Chakra UI component in-line style guidelines. Use this as a guide to craft your own custom components.

<br>

## `<Layout>` and Mobile Responsivity

The `<Layout>` component exported from the `components/layout/` directory is a custom component that will wrap each page of your site with a navigation bar and footer, and dictates the high-level structure of your website.

A custom hook is defined, `useWindowWidth(size)`, which tracks the screen width of a user's device and returns a boolean at a given `size` breakpoint in pixels which can be used to dynamically render components or the structure of a page. See an example of this in the `<Navbar>` component found in the `components/layout/navbar/` directory which dynmically renders a desktop or mobile version of the layout and navbar based on screen width.

The various Chakra UI components also enable quick and easy <a href="https://chakra-ui.com/docs/styled-system/responsive-styles" >mobile responsivity</a> by including breakpoint syntax within the inline CSS.

<br>

## <a href="https://axie-graphql.web.app/">Axie GraphQL</a> - Fetch and Display User's Assets

The API endpoint defined in the `pages/api/inventory/graphQL.ts` file makes server-side calls to the Axie GraphQL server to quickly fetch assets from a user's Ronin wallet such as their list of Axies, Runes & Charms, and Land NFTs. See their awesome documentation for more info!

Also, check out the SIWR demo's <a href="https://siwr-starter-pack.vercel.app/game" >Game page</a> after connecting your Ronin wallet for a live example of several of the above pieces working together. The Game page is only rendered and passed to the frontend upon a user's successful, authenticated connection to the site. Their session information is used to fetch the full list of Axies in their inventory via the Axie GraphQL server which is rendered as a set of `<AxieCard>` components for the selection and registration of their Axie team.

Selecting 3 Axies and clicking "Register" sends a POST request to the API endpoint defined in `pages/api/inventory/register.ts` which performs another graphQL query to double check the ownership of each Axie before they are registered to the user's account. Once registered with Axies, a user's account information may be passed to a remote client, such as a mobile gaming application, to dynamically render in-game user information.

<br>

## <a href="https://www.mongodb.com/" >MongoDB</a> and <a href="https://mongoosejs.com/" >Mongoose.js</a> - Persist and Process Data

User account information, registered Axies, and other project-relevant data are stored remotely via cloud-based database servers managed by MongoDB, while Mongoose.js presents a simple programmatic interface for carrying out database operations. Check out their awesome documentation for more info!

Connection to MongoDB is enabled by connection strings stored as environment variables found in the `.env.local.example` file. When setting up this package for your own use, be sure to change the name of this file to `.env.local` for Next.js to utilize during local development.

A MongoDB connection object, `dbConnection`, is created and cached by Mongoose via the `lib/backend/mongo/connectDB.ts` file. `dbConnection` and various <a href="https://mongoosejs.com/docs/api/model.html">Mongoose document queries</a> are utilized across the various API endpoints defined in SIWR's `pages/api/` directory to fetch, process, and store user and other project-specific data.

See the model and schema objects defined and exported from the `lib/backend/mongo/models/models.ts` file and `lib/backend/mongo/models/schemas/` directory as an example for how to use MongoDB and Mongoose to store your project-specific data.

<br>

## <a href="https://vercel.com/" >Vercel</a> - Host Your Site

Vercel is a platform for quickly hosting web applications and continuously integrates development updates via integration with remove git versioning providers such as GitHub.

The live demo of the <a href="https://siwr-starter-pack.vercel.app/">SIWR Starter Pack<a> and other applications adapted from the SIWR Starter Pack are deployed via Vercel, highly recommended!

<br>

## <a href="https://www.typescriptlang.org/" >Typescript</a> - Type Strong JavaScript

The SIWR Starter Pack is TypeScript enabled by default to help with the development process by "catching errors early in your editor" to create a more well functioning web application at scale.

Learn more about how TypeScript typing is integrated into the various components of this project such as Next.js, NextAuth.js, Mongoose.js, Chakra UI, etc. by going to the TypeScript sections in their respective documentations.

<br>

# Final Thoughts

I would love to hear from you if you use the SIWR Starter Pack to help jump start your Ronin-enabled project! Let me know in the GitHub discussion forum or on Twitter regarding what you found helpful and/or confusing so I can continue to improve it over time!

Also, let me know if there are other features you would like to see added and I can expand on the package and <a href="https://weirdtheway.medium.com/getting-started-with-the-sign-in-with-ronin-starter-pack-68c45eff484a" >tutorial</a> to include those (some ideas for this are already in the works so stay tuned)!

## Thanks for reading and happy hacking!

# ❤ w0nd3r

### If you found this package useful and would like to donate to w0nd3r, use the following addresses:

#### Ronin - ronin:8aa23faa9540090ae84c57378987889941244d8e

#### Ethereum - w0nd3r.eth (0xF5447b29dE5518968718D50d37939F44946d9F62)
