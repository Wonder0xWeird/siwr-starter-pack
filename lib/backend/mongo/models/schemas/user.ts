import mongoose from "mongoose"

/*** USER ***/
interface IUser {
  _id: mongoose.Types.ObjectId
  address: string
  username: string | null
  role: string
}
const userSchema = new mongoose.Schema<IUser>({
  address: String,
  username: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "user",
  },
})

export { type IUser, userSchema }
