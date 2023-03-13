import mongoose from "mongoose"

import { type INonce, nonceSchema } from "./schemas/nonce"
import {
  type IRegisteredAxie,
  type IRegisteredAxieModelType,
  registeredAxieSchema,
} from "./schemas/registeredAxies"
import {
  type IPayment,
  type IPaymentModelType,
  paymentSchema,
} from "./schemas/payment"
import {
  type IAccount,
  type IAccountModelType,
  accountSchema,
} from "./schemas/account"

if (mongoose.models) {
  delete mongoose.models.Nonce
  delete mongoose.models.RegisteredAxie
  delete mongoose.models.Payment
  delete mongoose.models.Account
}

const Nonce = mongoose.model<INonce>("Nonce", nonceSchema)

const RegisteredAxie = mongoose.model<
  IRegisteredAxie,
  IRegisteredAxieModelType
>("RegisteredAxie", registeredAxieSchema)

const Payment = mongoose.model<IPayment, IPaymentModelType>(
  "Payment",
  paymentSchema
)

const Account = mongoose.model<IAccount, IAccountModelType>(
  "Account",
  accountSchema
)

export { Nonce, RegisteredAxie, Payment, Account }
