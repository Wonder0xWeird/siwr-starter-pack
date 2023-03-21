import axios from "axios"
import { Account, RegisteredAxie } from "../../mongo/models/models"

export async function getOrCreateModelInstance(model, queryRequirement) {
  let instance

  //   switch (model) {
  //     case "ExampleModel1":
  //       instance =
  //         (await ExampleModel1.findOne({
  //           address: queryRequirement,
  //         }).exec()) ??
  //         (await new ExampleModel1({
  //           address: queryRequirement,
  //         }).save())
  //       break

  //     case "ExampleModel2":
  //       instance =
  //         (await ExampleModel2.findOne({
  //           someKey: queryRequirement,
  //         }).exec()) ??
  //         (await new ExampleModel2({
  //           someKey: queryRequirement,
  //         }).save())
  //       break
  //   }

  return instance
}

export async function getTokenOwnerUserInfo(tokenType, tokenId) {
  let user
  switch (tokenType) {
    case "Axie":
      {
        const axie = await getAxieDetail(tokenId)
        user = await Account.findOne({ "user.address": axie.owner }).then(
          (foundAccount) => foundAccount.user
        )
      }
      break
    // case "OtherToken":
    //   user = await OtherToken.findOne({ tokenId: tokenId }).then(
    //     (foundToken) => foundToken.ownedBy
    //   )
    //   break
  }
  return user
}

export async function getAxieDetail(axieId) {
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
