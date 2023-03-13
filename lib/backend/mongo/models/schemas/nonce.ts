import mongoose from "mongoose"

/*** NONCE ***/
interface INonce {
  nonce: string
  createdAt: Date
}
const nonceSchema = new mongoose.Schema<INonce>({
  nonce: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})
nonceSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 })

export { type INonce, nonceSchema }
