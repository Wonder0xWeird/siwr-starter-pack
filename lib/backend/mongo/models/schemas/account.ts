import mongoose from "mongoose"
import { type IWallet, walletSchema } from "./wallet"
import { type IUser, userSchema } from "./user"

/*** ACCOUNT ***/
interface IAccount {
  _id: mongoose.Types.ObjectId
  user: IUser
  password: string
  registeredAxies: number[]
  wallet: IWallet
  createdAt: number
  updatedAt: number
}
type IAccountDocumentProps = {
  user: mongoose.Types.Subdocument<mongoose.Types.ObjectId> & IUser
  wallet: mongoose.Types.Subdocument<mongoose.Types.ObjectId> & IWallet
}
type IAccountModelType = mongoose.Model<IAccount, {}, IAccountDocumentProps>

const accountSchema = new mongoose.Schema<IAccount, IAccountModelType>({
  user: userSchema,
  password: String,
  registeredAxies: [Number],
  wallet: {
    type: walletSchema,
    default: {
      payments: [],
    },
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
})

export { type IAccount, type IAccountModelType, accountSchema }
