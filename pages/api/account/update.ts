import dbConnection from "../../../lib/backend/mongo/connectDB"
import type { NextApiRequest, NextApiResponse } from "next"
import {
  Account,
  RegisteredAxie,
} from "../../../lib/backend/mongo/models/models"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { hash } from "bcryptjs"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

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

    const { username, password, passwordConf } = req.body

    if (password !== passwordConf) {
      return res.status(400).json({
        statusCode: 400,
        message: "Passwords do not match.",
        data: null,
      })
    }

    Account.findOne({
      "user._id": { $ne: session.user.id },
      "user.username": { $regex: new RegExp("^" + username + "$", "i") },
    }).then(async (foundAccount) => {
      if (foundAccount) {
        return res.status(400).json({
          statusCode: 400,
          message: "Account update failed. This username is already in use.",
          data: null,
        })
      }

      const hashedPassword = await hash(password, 12)
      Account.findOneAndUpdate(
        { "user._id": session.user.id },
        {
          $set: {
            "user.username": username,
            password: hashedPassword,
          },
        },
        {
          new: true,
        }
      ).then(async (updatedAccount) => {
        console.log("updatedAccount:", updatedAccount)

        if (session.user.username && session.user.username !== username) {
          await updateDatabaseCollections(session.user.username, username)
        }

        return res.status(200).json({
          statusCode: 200,
          message: "Account updated successfully.",
          data: {
            username: username,
          },
        })
      })
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

async function updateDatabaseCollections(oldUsername, newUsername) {
  RegisteredAxie.updateMany(
    { "registeredBy.username": oldUsername },
    {
      $set: {
        "registeredBy.username": newUsername,
      },
    },
    (err, result) => {
      if (err) {
        console.log("Error updating RegisteredAxies: ", err)
      }
      console.log("RegisteredAxie modified count:", result.modifiedCount)
    }
  )
}
