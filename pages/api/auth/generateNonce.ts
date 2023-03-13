import type { NextApiRequest, NextApiResponse } from "next"
import { Nonce } from "../../../lib/backend/mongo/models/models"
import dbConnection from "../../../lib/backend/mongo/connectDB"
import { v4 as uuidv4 } from "uuid"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnection

  try {
    const generatedNonce = await uuidv4()
    const nonce = new Nonce({
      nonce: generatedNonce,
    })
    console.log("nonce:", nonce)
    await nonce.save()
    res.status(200).json({
      statusCode: 200,
      message: "Nonce generation successful",
      data: nonce.nonce,
    })
  } catch (err) {
    throw new Error(err)
  }
}
