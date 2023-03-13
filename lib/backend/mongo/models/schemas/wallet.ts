import mongoose from "mongoose"
import { type IPayment, paymentSchema } from "./payment"

/*** WALLET ***/
interface IWallet {
  payments: IPayment[]
}
type IWalletDocumentProps = {
  payments: mongoose.Types.DocumentArray<IPayment>
}
type IWalletModelType = mongoose.Model<IWallet, {}, IWalletDocumentProps>
const walletSchema = new mongoose.Schema<IWallet, IWalletModelType>({
  payments: {
    type: [paymentSchema],
    default: [],
  },
})

export { type IWallet, walletSchema }
