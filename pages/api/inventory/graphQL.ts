import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const payload = req.body.payload

    const result = await axios
      .post(
        "https://graphql-gateway.axieinfinity.com/graphql",
        payload,
        headers
      )
      .then((result) => {
        return result
      })
      .catch((err) => {
        console.log("Error fetching user Axies:", err)
        return result
      })

    return res.status(200).json({
      statusCode: 200,
      message: "User Axies fetched successfully.",
      data: result.data.data,
    })
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: "Error with the request.",
      data: error,
    })
  }
}
