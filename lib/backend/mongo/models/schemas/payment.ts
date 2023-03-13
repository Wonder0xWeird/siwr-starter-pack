import mongoose from "mongoose"
import { type IUser, userSchema } from "./user"

/*** PAYMENT ***/
interface IPayment {
  _id: mongoose.Types.ObjectId
  user: IUser
  service: string
  description: string
  roninTransaction: {
    txAmount: number
    intakeAmount: number
    token: {
      name: string
      address: string
    }
    hash: string
    refundRequired: {
      numPurchasesToRefund: number
      amountToRefund: number
      refundToken: string
      refundReason: string
      acknowledged: boolean
      acknowledgementHash: string
    }
  }
  result: {
    success: boolean
    acknowledged: boolean
  }
  createdAt: number
  updatedAt: number
}
type IPaymentDocumentProps = {
  user: mongoose.Types.Subdocument<mongoose.Types.ObjectId> & IUser
}
type IPaymentModelType = mongoose.Model<IPayment, {}, IPaymentDocumentProps>
const paymentSchema = new mongoose.Schema<IPayment, IPaymentModelType>({
  service: String,
  user: userSchema,
  description: String,
  roninTransaction: {
    txAmount: {
      type: Number,
    },
    intakeAmount: {
      type: Number,
    },
    token: {
      name: String,
      address: String,
    },
    hash: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    refundRequired: {
      numPurchasesToRefund: Number,
      amountToRefund: Number,
      refundToken: String,
      refundReason: String,
      acknowledged: Boolean,
      acknowledgementHash: String,
    },
  },
  result: {
    success: {
      type: Boolean,
      default: true,
    },
    acknowledged: {
      type: Boolean,
      default: true,
    },
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now(),
  },
})
paymentSchema.index(
  { "roninTransaction.hash": 1 },
  { unique: true, sparse: true }
)

export { type IPayment, type IPaymentModelType, paymentSchema }
