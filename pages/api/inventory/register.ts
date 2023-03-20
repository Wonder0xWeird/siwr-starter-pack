import dbConnection from "../../../lib/backend/mongo/connectDB"
import type { NextApiRequest, NextApiResponse } from "next"
import {
  Account,
  RegisteredAxie,
} from "../../../lib/backend/mongo/models/models"
// import { getAxieDetails } from "../../../lib/backend/api/utils/graphQueries"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import axios from "axios"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(400).json({
        statusCode: 400,
        message: "You must be logged in.",
        data: null,
      })
    }

    const registeringAxies = req.body

    await dbConnection

    await Account.findOne({ "user._id": session.user.id })
      .then(async (foundAccount) => {
        if (!foundAccount) {
          return res.status(404).json({
            statusCode: 404,
            message: "Account not found",
            data: null,
          })
        }

        if (foundAccount.registeredAxies.length > 0) {
          return res.status(403).json({
            statusCode: 403,
            message: "Forbidden: this account already has registered axies.",
            data: null,
          })
        }

        let registeredAxies = []
        for (let i = 0; i < registeringAxies.length; i++) {
          const axieDetail = await getAxieDetail(registeringAxies[i].id)
          if (
            axieDetail.owner.toLowerCase() !==
            foundAccount.user.address.toLowerCase()
          ) {
            return res.status(403).json({
              statusCode: 403,
              message:
                "Forbidden: this account does not own Axie with id: " +
                registeringAxies[i].id,
              data: null,
            })
          }

          await RegisteredAxie.findOne({ id: req.body[i].id }).then(
            async (foundRegisteredAxie) => {
              if (foundRegisteredAxie) {
                foundAccount.registeredAxies.push(foundRegisteredAxie.id)
                registeredAxies.push(foundRegisteredAxie)
              } else {
                const newRegisteredAxie = new RegisteredAxie({
                  registeredBy: foundAccount.user,
                  id: registeringAxies[i].id,
                  class: registeringAxies[i].class,
                  bodyShape: registeringAxies[i].bodyShape,
                  color: registeringAxies[i].color,
                  parts: registeringAxies[i].parts,
                })
                newRegisteredAxie.save()
                foundAccount.registeredAxies.push(newRegisteredAxie.id)
                registeredAxies.push(newRegisteredAxie)
              }
            }
          )
        }

        await foundAccount.save()

        return res.status(200).json({
          statusCode: 200,
          message: "Axies successfully registered",
          data: registeredAxies,
        })
      })
      .catch((error) =>
        res.status(500).json({
          statusCode: 500,
          message: "Server error: " + error,
          data: null,
        })
      )
  } catch (err) {
    console.log("Error registering Axies:", err)
    return res.status(500).json({
      statusCode: 500,
      message: "Error registering Axies:" + err,
      data: null,
    })
  }
}

async function getAxieDetail(axieId) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const axieQuery = {
    operationName: "GetAxieDetail",
    variables: {
      axieId: axieId,
    },
    query: `query GetAxieDetail($axieId: ID!) {
            axie(axieId: $axieId) {
                ...AxieDetail
            }
        }
            
        fragment AxieDetail on Axie {
            id
            image
            class
            name
            genes
            owner
            bodyShape
            parts {
                type
                id
                name
                class
            }
        }`,
  }

  return await axios
    .post(
      "https://graphql-gateway.axieinfinity.com/graphql",
      axieQuery,
      headers
    )
    .then((result) => {
      return result.data.data.axie
    })
    .catch((err) => {
      console.log("Error fetching user Axies:", err)
      return null
    })
}
