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
  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(400).json({
        statusCode: 400,
        message: "You must be logged in.",
        data: null,
      })
      return
    }

    await dbConnection

    await Account.findOne({ "user._id": session.user.id }).then(
      async (foundAccount) => {
        if (!foundAccount) {
          return res.status(404).json({
            statusCode: 404,
            message: "Account not found",
            data: null,
          })
        }

        if (!foundAccount.registeredAxies.length) {
          return res.status(404).json({
            statusCode: 404,
            message: "This account has no registered axies",
            data: null,
          })
        }

        foundAccount.registeredAxies = []
        await foundAccount.save()

        return res.status(200).json({
          statusCode: 200,
          message: "Axies successfully unregistered",
          data: null,
        })
      }
    )
  } catch (err) {
    console.log("Error unregistering Axies:", err)
    return res.status(500).json({
      statusCode: 500,
      message: "Error unregistering Axies:" + err,
      data: null,
    })
  }
}
