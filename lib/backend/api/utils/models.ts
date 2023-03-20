import { ethers } from "ethers"
import { getAxieDetail } from "../../../frontend/graphQueries"
import { Account, RegisteredAxie } from "../../mongo/models/models"
// import { nullifyTransaction } from "../payments/payments"

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
  //           address: queryRequirement,
  //         }).exec()) ??
  //         (await new ExampleModel2({
  //           address: queryRequirement,
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
        const axie = await getAxieDetail(tokenId) //, "https://doll.tioland.com/"
        user = await Account.findOne({ "user.address": axie.owner }).then(
          (foundAccount) => foundAccount.user
        )
      }
      break
    // case "OtherToken":
    //   user = await OtherToken.findOne({ tokenId: tokenId }).then(
    //     (foundSidekick) => foundSidekick.ownedBy
    //   )
    //   break
  }
  return user
}
