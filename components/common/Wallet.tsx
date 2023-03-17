import React from "react"
import { ethers } from "ethers"
import axios from "axios"
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  useColorModeValue,
} from "@chakra-ui/react"

import { useSession } from "next-auth/react"
import {
  checkPaymentProcessorStatus,
  configureRonin,
} from "../../lib/frontend/wallet"
import type { IRoninConfig } from "../../lib/frontend/wallet"
import { sliceRoninAddress } from "../../lib/utils/wallet"
// import Waiting from "./Waiting"

interface IProductInfo {
  productNamePlural: string
  productNameSingular: string
  numRemaining: number
  tokenToUse: string
  tokenContractUnit: number
  priceInToken: number
  tokenImage: string
}

export default function DollWallet(props) {
  const [roninWalletInterface, setRoninWalletInterface] =
    React.useState<IRoninConfig | null>()
  const [shieldsRemaining, setShieldsRemaining] = React.useState<number>()
  const [itemsToPurchase, setItemsToPuchase] = React.useState<number>(0)
  const [productInfo, setProductInfo] = React.useState<IProductInfo>()
  const [txPending, setTxPending] = React.useState<boolean>(false)
  const [txResult, setTxResult] = React.useState<string | null>()
  const [isMobile, setIsMobile] = React.useState(null)

  const { data: session, status } = useSession()

  // const wlSale = new Date("2022-11-17Z18:00:00")
  // const publicSale = new Date("2022-11-18Z18:00:00")

  // const getTimeRemaining = () => {
  //   const currentDate = Date.now()
  //   const wlSaleDate = wlSale.getTime()
  //   const diff = (wlSaleDate - currentDate) / 1000
  //   return diff
  // }

  async function getUserRoninInfo() {
    let paymentReceiver = "treasury"
    if (props.itemToPurchase === "Shields") {
      paymentReceiver = "armory"
    }
    const roninConfig: IRoninConfig = await configureRonin(
      props.tokenToUse,
      paymentReceiver
    )
    if (!roninConfig) {
      // alert("Ronin wallet is not installed!")
      return
    }
    setRoninWalletInterface(roninConfig)
  }

  async function getUserShields() {
    await axios.get("/api/auth/get-user-shield-count").then((result) => {
      setShieldsRemaining(result.data.data)
    })
  }

  async function getProductInfo() {
    await axios
      .get(`/api/payments/get-product-info?productName=${props.itemToPurchase}`)
      .then((result) => {
        setProductInfo(result.data.data)
        props.setProductInfo(result.data.data)
      })
  }

  async function getUserRemainingWLPurchases() {
    // `http://localhost:3001/getWhitelist?requestedAddress=${props.connectedAddress}`
    // `https://dollserve.herokuapp.com/getWhitelist?requestedAddress=${props.connectedAddress}`
    const userRemainingWLPurchases = await axios
      .get(
        `https://dollserve.herokuapp.com/getWhitelist?requestedAddress=${props.connectedAddress}`
      )
      .then(
        (response) =>
          response.data.data.purchaseLimit - response.data.data.purchaseCount
      )
    props.setRemainingWLPurchases(userRemainingWLPurchases)
  }

  React.useEffect(() => {
    getProductInfo()
    getUserShields()

    const mobileCheck =
      navigator.maxTouchPoints || "ontouchstart" in document.documentElement
    setIsMobile(mobileCheck)

    if (!mobileCheck) {
      getUserRoninInfo()
      // @ts-ignore
      window.ronin.roninEvent.addEventListener("account_changed", () => {
        getUserRoninInfo()
      })
    }
  }, [])

  // async function checkPaymentProcessorStatus(product) {
  //   console.log("product:", product)
  //   const isOnline = await axios
  //     .post("/api/payments/get-processor-status", { product })
  //     .then((res) => res.data.data.isOnline)

  //   console.log(`Payment processor for ${product} is online: ${isOnline}`)

  //   return isOnline
  // }

  async function buy() {
    console.log("productInfo.productNamePlural:", productInfo.productNamePlural)
    if (
      !(await checkPaymentProcessorStatus(productInfo.productNamePlural)) &&
      productInfo.productNamePlural !== "Sidekicks"
    ) {
      alert(
        `The payment processor for ${productInfo.productNamePlural} is temporarily offline, please try again later.`
      )
      return
    }
    if (itemsToPurchase <= 0 || isNaN(itemsToPurchase)) {
      //@ts-ignore
      alert(
        `You must enter a positive integer value in the '${props.itemToPurchase} to Purchase' field.`
      )
      return
    }

    if (productInfo.productNamePlural === "Sidekicks") {
      const updatedRemaining = await axios
        .get(
          `/api/payments/get-product-info?productName=${props.itemToPurchase}`
        )
        .then((result) => {
          return result.data.data.numRemaining
        })
      if (updatedRemaining <= 0) {
        alert(`${props.itemToPurchase} are sold out!`)
        return
      } else if (itemsToPurchase > updatedRemaining) {
        alert(
          `There are only ${updatedRemaining} ${props.itemToPurchase} remaining. Please adjust your purchase amount.`
        )
        return
      }
    } else if (productInfo.productNamePlural === "AxieLevelUps") {
      console.log(
        "props.axieLevelSum + itemsToPurchase:",
        props.axieLevelSum + itemsToPurchase
      )
      console.log("props.axieLevelSumCap:", props.axieLevelSumCap)
      if (props.axieLevelSum + itemsToPurchase > props.axieLevelSumCap) {
        alert(
          "You are attempting to purchase more levels than your axies have available, please reduce the amount of levels you are requesting to purchase before proceeding."
        )
        return
      }
    }
    if (
      itemsToPurchase * productInfo.priceInToken >
      roninWalletInterface.balance / productInfo.tokenContractUnit
    ) {
      alert("Your token balance is too low to complete this purchase.")
      return
    }

    const addressAlert =
      "Ronin Wallet Alert: the Ronin address you are connected with does not match your DoLL account address. Please switch your connected address to your DoLL account address, refresh the page, and try again."

    if (
      roninWalletInterface.activeAddress.toLowerCase() !==
      props.connectedAddress.toLowerCase()
    ) {
      alert(addressAlert)
      return
    }

    completePurchase()
  }

  async function completePurchase() {
    setTxPending(true)
    setTxResult(null)
    try {
      isMobile && window.open("https://wallet.roninchain.com", "_self")
      const totalCost = (
        itemsToPurchase *
        productInfo.priceInToken *
        productInfo.tokenContractUnit
      ).toString()
      const amountBigInt = ethers.utils.parseUnits(totalCost, 0)
      const txData = {
        gasLimit: 100000,
      }
      const tx = await roninWalletInterface.tokenContractSigner.transfer(
        roninWalletInterface.receiver,
        amountBigInt,
        txData
      )
      await tx.wait()

      const paymentObject = {
        amount: amountBigInt,
        sender: roninWalletInterface.activeAddress,
        receiver: roninWalletInterface.receiver,
        tx: tx,
      }

      // *********SIDEKICKS GEN 2*********

      if (props.itemToPurchase === "Sidekicks") {
        // check /getNumSidekicksRemaining for sidekick count
        const userId = session?.user.id
        const numPurchaseReq = itemsToPurchase
        await axios
          // .post("http://localhost:3001/jobs", {
          .post("https://dollserve.herokuapp.com/jobs", {
            paymentObject,
            numPurchaseReq,
            userId,
          })
          .then((result) =>
            console.log("sidekick dummy purchase result:", result.data)
          )

        getUserRemainingWLPurchases()
      } else {
        await axios
          .post(
            `/api/payments/purchase-${props.itemToPurchase.toLowerCase()}`,
            paymentObject
          )
          .then((result) => {
            if (result.data.statusCode === 200) {
              setTxResult("Transaction Success!")
              if (props.itemToPurchase === "AxieLevelUps") {
                props.setAxieLevelUps(result.data.data)
                props.runLevelUpGacha(result.data.data)
              }
            } else {
              setTxResult("Transaction Failure.")
              console.log("Transaction Failure:", result.data.message)
            }
          })
      }

      getUserRoninInfo()
      getUserShields()
      getProductInfo()
      setTxResult("Transaction Success!")
      setTxPending(false)
    } catch (error) {
      console.log("Error processing transaction:", error.message)
      getUserRoninInfo()
      getUserShields()
      getProductInfo()
      setTxPending(false)
      setTxResult("Transaction Failure.")
    }
  }

  function handleItemsToPurchase(e) {
    setItemsToPuchase(parseInt(e.target.value))
  }

  return (
    <Box transition="height 2s">
      <Heading fontSize={{ base: "20px", md: "30px" }} textAlign="center">
        {`DoLL ${props.itemToPurchase} Checkout`}
      </Heading>

      {roninWalletInterface ? (
        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          columnGap={3}
          rowGap={6}
          pt={4}
        >
          <GridItem colSpan={2}>
            <VStack
              justifyContent="flex-start"
              rowGap={{ base: "10px", md: "30px" }}
              h="100%"
            >
              <Heading fontSize={{ base: "18px", md: "28px" }}>Wallet</Heading>
              <Flex alignItems="center" fontSize="15px">
                <Text>
                  Active Address:
                  <strong style={{ marginLeft: "5px" }}>
                    {sliceRoninAddress(roninWalletInterface.activeAddress)}
                  </strong>
                </Text>
                <Box
                  ml={2}
                  boxSize={3}
                  borderRadius="50%"
                  bg={
                    props.connectedAddress ===
                    roninWalletInterface.activeAddress
                      ? "green.300"
                      : "orange.300"
                  }
                />
              </Flex>
              <Flex
                rowGap="15px"
                flexDirection={{ base: "row", md: "column" }}
                justifyContent={{ base: "space-around", md: "flex-start" }}
                w="100%"
              >
                <Flex alignSelf="center" alignItems="center">
                  <Image
                    height={{ base: "20px", md: "38px" }}
                    width={{ base: "20px", md: "38px" }}
                    src="/images/shield_icon.png"
                  />
                  <Heading fontSize="20px" ml="10px">
                    {shieldsRemaining ? shieldsRemaining.toLocaleString() : "0"}
                  </Heading>
                </Flex>
                <Flex alignSelf="center" alignItems="center">
                  <Image
                    src={`/images/${props.tokenToUse}.png`}
                    width={{ base: "28px", md: "48px" }}
                    height={{ base: "28px", md: "48px" }}
                  />
                  <Heading fontSize="20px" ml="10px">
                    {productInfo
                      ? (
                          roninWalletInterface.balance /
                          productInfo.tokenContractUnit
                        ).toLocaleString()
                      : "..."}
                  </Heading>
                </Flex>
              </Flex>
            </VStack>
          </GridItem>

          <GridItem colSpan={2}>
            <SimpleGrid columns={2} columnGap={3} rowGap={6}>
              <GridItem colSpan={2}>
                <Flex justifyContent="center" alignItems="center">
                  <Heading size="md" pr={2}>
                    <strong>1x</strong>
                  </Heading>

                  {productInfo && (
                    <Image
                      height="20px"
                      width="20px"
                      src={`/images/${productInfo.productNameSingular.toLowerCase()}_icon.png`}
                    />
                  )}
                  <Heading size="md" pl={2}>
                    <strong>
                      {productInfo ? " = " + productInfo.priceInToken : "..."}x
                    </strong>
                  </Heading>
                  {productInfo && (
                    <Image
                      height="28px"
                      width="28px"
                      src={productInfo.tokenImage}
                    />
                  )}
                </Flex>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel textDecoration="underline">
                    {props.itemToPurchase} to Purchase
                  </FormLabel>
                  {productInfo && (
                    <Input
                      type="number"
                      w="90%"
                      bg={
                        productInfo.productNamePlural === "Sidekicks" &&
                        productInfo.numRemaining - itemsToPurchase < 0
                          ? "red.200"
                          : "white"
                      }
                      color="black"
                      placeholder="#####"
                      pattern="[0-9]"
                      value={itemsToPurchase}
                      onChange={handleItemsToPurchase}
                    />
                  )}
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <VStack>
                  <Text textDecoration="underline">
                    Total {props.tokenToUse} Cost
                  </Text>
                  <Text pt={2}>
                    {productInfo
                      ? isNaN(itemsToPurchase * productInfo.priceInToken)
                        ? 0
                        : (
                            itemsToPurchase * productInfo.priceInToken
                          ).toLocaleString()
                      : "..."}{" "}
                    {props.tokenToUse}
                  </Text>
                </VStack>
              </GridItem>

              <GridItem colSpan={2} position="relative">
                <Button
                  variant="primary"
                  w="full"
                  onMouseUp={buy}
                  disabled={txPending ? true : false}
                >
                  {productInfo && (
                    <Image
                      src={`/images/${productInfo.productNameSingular.toLowerCase()}_icon.png`}
                      width="20px"
                      height="20px"
                    />
                  )}
                  <Heading ml={1} size="md">
                    Buy
                  </Heading>
                </Button>
                <Box fontSize="14px" textAlign="center">
                  {productInfo.productNamePlural === "Sidekicks" &&
                    productInfo.numRemaining + " remaining"}
                </Box>
                <VStack
                  fontSize="20px"
                  className="centerFlex"
                  height={txPending ? "90px" : "0px"}
                  right="0"
                  left="0"
                  transition="height 0.5s"
                  textAlign="center"
                  mt={"1px"}
                  color="orange.300"
                >
                  <Text>{txPending && "Transaction Pending."}</Text>
                  <Box fontSize="12px">
                    {txPending &&
                      "Please do not refresh this page, or you may NOT be credited with your purchase."}
                  </Box>
                </VStack>

                <VStack
                  fontSize="18px"
                  right="0"
                  left="0"
                  className="centerFlex"
                  height={txResult ? "90px" : "0px"}
                  textAlign="center"
                  transition="height 0.5s"
                  mt={"1px"}
                  color={
                    txResult === "Transaction Success!"
                      ? "green.300"
                      : "red.400"
                  }
                >
                  <Text>{txResult && txResult}</Text>
                  <Box fontSize="12px">
                    {txResult &&
                      txResult !== "Transaction Success!" &&
                      "Please contact the DoLL team for assistance if you believe this was an error."}
                  </Box>
                </VStack>
              </GridItem>
            </SimpleGrid>
          </GridItem>
        </SimpleGrid>
      ) : (
        <VStack pt={4}>
          <Text>🔒 Unlock your Ronin wallet to begin...</Text>
          {isMobile && (
            <Button
              bg={useColorModeValue("gray.300", "gray.900")}
              onClick={getUserRoninInfo}
            >
              Unlock Wallet
            </Button>
          )}
        </VStack>
      )}
    </Box>
  )
}
