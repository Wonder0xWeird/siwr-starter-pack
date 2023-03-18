import dbConnection from "../../../lib/backend/mongo/connectDB"
import type { NextApiRequest, NextApiResponse } from "next"
import {
  Account,
  RegisteredAxie,
} from "../../../lib/backend/mongo/models/models"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  console.log("session:", session)

  if (!session) {
    res.status(400).json({
      statusCode: 400,
      message: "You must be logged in.",
      data: null,
    })
    return
  }

  try {
    await dbConnection

    const foundAccount = await Account.findOne({ "user._id": session.user.id })
    if (!foundAccount) {
      return res.status(404).json({
        statusCode: 404,
        message: "Account not found",
        data: null,
      })
    }

    if (foundAccount.registeredAxies.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "This account has no registered axies",
        data: null,
      })
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully found user's registered axies",
      data: {
        registeredAxies: await RegisteredAxie.find({
          axieId: { $in: foundAccount.registeredAxies },
        }),
      },
    })
  } catch (err) {
    // throw new Error(err)
    console.log(err)
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized: " + err.message,
      data: null,
    })
  }
}
