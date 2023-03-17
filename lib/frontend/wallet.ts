import axios from "axios"
import { ethers, providers } from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"

const transferAndBalanceABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "_success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

declare global {
  interface Window {
    ethereum: any
    ronin: {
      provider: ethers.providers.ExternalProvider
      roninEvent: EventListener
    }
  }
  interface ExternalProvider {
    selectedAddress: any
  }
}

export interface IRoninConfig {
  provider: ethers.providers.Web3Provider
  activeAddress: string
  tokenContractSigner: ethers.Contract
  balance: number
  receiver: string
}

export async function getConnectionDetails() {
  const { nonce, message } = await axios
    .post("/api/auth/generateNonce")
    .then(async (result) => {
      const nonce = result.data.data
      console.log("generated nonce result:", nonce)
      const message =
        "Defenders of Lunacian Lands Ronin Secure Sign On: " + nonce
      return { nonce, message }
    })

  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  )

  let web3Provider, signature, connectRequestBody

  if (!isMobile) {
    if (window.ronin === undefined) {
      return -1
    }
    web3Provider = new ethers.providers.Web3Provider(window.ronin.provider)
  } else {
    //check for the case of touch screen devices with
    web3Provider = await connectMobileProvider()
  }

  if (await isUnlocked(web3Provider)) {
    signature = await web3Provider.getSigner().signMessage(message)

    connectRequestBody = {
      message: message,
      nonce: nonce,
      signature: signature,
      redirect: false,
    }
    console.log("connectBody:", connectRequestBody)
  } else {
    alert("You must unlock your Ronin wallet.")
  }

  return connectRequestBody
}

export const configureRonin = async (
  tokenToUse,
  paymentReceiver = "treasury"
) => {
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  )

  let web3Provider
  if (!isMobile) {
    if (window.ronin === undefined) {
      console.log("Ronin wallet is not installed.")
      return null
    }
    web3Provider = new ethers.providers.Web3Provider(window.ronin.provider)
  } else {
    web3Provider = await connectMobileProvider()
  }

  if (await isUnlocked(web3Provider)) {
    const jsonRpcSigner = web3Provider.getSigner()
    const connectedAddress = await jsonRpcSigner.getAddress()

    const tokenAddress = getTokenAddress(tokenToUse)
    const contract = new ethers.Contract(
      tokenAddress,
      transferAndBalanceABI,
      web3Provider
    )
    const tokenContractSigner = contract.connect(jsonRpcSigner)
    const balance = await getBalance(connectedAddress, tokenAddress)

    let transactionPaymentReceiver = await axios
      .get(`/api/payments/dollAddresses/${paymentReceiver}`)
      .then((response) => response.data.data)

    return {
      provider: web3Provider,
      activeAddress: connectedAddress.toLowerCase(),
      tokenContractSigner: tokenContractSigner,
      balance: parseInt(balance),
      receiver: transactionPaymentReceiver,
    }
  } else {
    alert(
      "You must unlock your Ronin wallet to use the payment functions on this page."
    )
    return null
  }
}

async function isUnlocked(provider: ethers.providers.Web3Provider) {
  let isUnlocked: boolean
  try {
    const accounts = await provider.listAccounts()
    isUnlocked = accounts.length > 0
  } catch (e) {
    console.log("error:", e)
    isUnlocked = false
  }
  return isUnlocked
}

function getTokenAddress(tokenToUse) {
  if (tokenToUse === "SLP") {
    return "0xa8754b9Fa15fc18BB59458815510E40a12cD2014"
  } else if (tokenToUse === "USDC") {
    return "0x0b7007c13325c48911f73a2dad5fa5dcbf808adc"
  } else if (tokenToUse === "AXS") {
    return "0x97a9107c1793bc407d6f527b77e7fff4d812bece"
  }
}

async function getBalance(address, tokenAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.roninchain.com/rpc"
  )
  const contract = new ethers.Contract(
    tokenAddress,
    transferAndBalanceABI,
    provider
  )

  let balance = await contract.balanceOf(address)
  balance = ethers.utils.formatUnits(balance, 0)

  return balance
}

export async function connectMobileProvider() {
  const provider = new WalletConnectProvider({
    bridge: "https://bridge.walletconnect.org",
    rpc: { "2020": "https://api.roninchain.com/rpc" },
    qrcode: false,
  })

  provider.connector.on("display_uri", (err, payload) => {
    const uri = payload.params[0]
    console.log(uri)
    const encoded = encodeURIComponent(uri)
    console.log(encoded)
    const url = `https://wallet.roninchain.com/auth-connect?uri=${encoded}`
    window.open(url, "_self")
  })

  await provider.enable()
  const web3Provider = new providers.Web3Provider(provider)
  return web3Provider
}

export async function checkPaymentProcessorStatus(product) {
  console.log("product:", product)
  const isOnline = await axios
    .post("/api/payments/get-processor-status", { product })
    .then((res) => res.data.data.isOnline)

  console.log(`Payment processor for ${product} is online: ${isOnline}`)

  return isOnline
}
