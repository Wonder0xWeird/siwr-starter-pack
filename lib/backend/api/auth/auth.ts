import { ethers } from "ethers"
import { compare } from "bcryptjs"
import dbConnection from "../../../../lib/backend/mongo/connectDB"
import { Account, Nonce } from "../../mongo/models/models"
import siwrConfig from "../../../../siwr.config"
import { NextApiResponse } from "next"
import { Session } from "next-auth"

export async function authorizeRonin(credentials) {
  try {
    await dbConnection

    const verifiedUserAddress = await Nonce.findOne({
      nonce: credentials.nonce,
    }).then(async (foundNonce) => {
      if (!foundNonce) {
        throw new Error("Invalid Nonce")
      }

      const signerAddress = verifyNonceAndAddress(credentials)
      if (signerAddress) {
        await Nonce.deleteOne({
          nonce: credentials.nonce,
        })

        return signerAddress.toLowerCase()
      } else {
        return null
      }
    })

    return await Account.findOne({
      "user.address": verifiedUserAddress,
    }).then(async (foundAccount) => {
      if (foundAccount) {
        return {
          address: foundAccount.user.address,
          username: foundAccount.user.username,
          id: foundAccount.user.id,
          role: foundAccount.user.role,
        }
      } else {
        const newAccount = new Account({
          user: {
            address: verifiedUserAddress,
          },
        })
        await newAccount.save()
        return {
          address: newAccount.user.address,
          username: newAccount.user.username,
          id: newAccount.user.id,
          role: newAccount.user.role,
        }
      }
    })
  } catch (err) {
    console.log("authorization err:", err)
    return null
  }
}

function verifyNonceAndAddress(credentials) {
  let nonceCheck, addressCheck
  if (siwrConfig.allowListed) {
    nonceCheck = JSON.parse(credentials.message).nonce
    addressCheck = JSON.parse(credentials.message).address
  } else {
    nonceCheck = JSON.parse(JSON.parse(credentials.message).message).nonce
    addressCheck = JSON.parse(JSON.parse(credentials.message).message).address
  }

  const signerAddress = ethers.utils.verifyMessage(
    credentials.message,
    credentials.signature
  )

  if (nonceCheck !== credentials.nonce) {
    throw new Error("Invalid Nonce-Message Pair")
  }
  if (addressCheck !== signerAddress) {
    throw new Error("Invalid Address")
  }

  return signerAddress
}

export async function authorizeLogin(credentials) {
  try {
    await dbConnection

    return await Account.findOne({
      "user.username": credentials.username,
    }).then(async (foundAccount) => {
      if (!foundAccount) {
        throw new Error("Account not found.")
      }

      const checkPasswordMatch = await compare(
        credentials.password,
        foundAccount.password
      )
      if (!checkPasswordMatch) {
        throw new Error("Incorrect password.")
      }

      return {
        address: foundAccount.user.address,
        username: foundAccount.user.username,
        id: foundAccount.user.id,
        role: foundAccount.user.role,
      }
    })
  } catch (err) {
    console.log("authorization err:", err)
    return null
  }
}

export function isAdmin(res: NextApiResponse, session: Session) {
  let isAdmin = true
  if (!session || session.user.role !== "admin") {
    isAdmin = false
    res.status(401).json({
      statusCode: 401,
      message:
        "Unauthorized: You must be logged in as an adminstrator to access this function.",
      data: null,
    })
  }
  return isAdmin
}

export function isAdminOrVIP(res: NextApiResponse, session: Session) {
  let isVIP = true
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "VIP")
  ) {
    isVIP = false
    res.status(401).json({
      statusCode: 401,
      message:
        "Unauthorized: You must be logged in as a VIP or admin to access this function.",
      data: null,
    })
  }
  return isVIP
}
