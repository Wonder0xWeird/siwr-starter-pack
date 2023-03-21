import mongoose from "mongoose"
import { type IUser, userSchema } from "./user"

/*** REGISTERED AXIES ***/
interface IRegisteredAxie {
  _id: mongoose.Types.ObjectId
  registeredBy: IUser
  id: string
  class: string
  bodyShape: string
  color: string
  parts: [{ type: string; id: string; name: string; class: string }]
  createdAt: number
  updatedAt: number
}
type IRegisteredAxieDocumentProps = {
  user: mongoose.Types.Subdocument<mongoose.Types.ObjectId> & IUser
}
type IRegisteredAxieModelType = mongoose.Model<
  IRegisteredAxie,
  {},
  IRegisteredAxieDocumentProps
>

const registeredAxieSchemaObject = {
  registeredBy: userSchema,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  class: String,
  bodyShape: String,
  color: String,
  parts: [{ type: { type: String }, id: String, name: String, class: String }],
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
}

const nonUniqueRegisteredAxieSchemaObject = {
  ...registeredAxieSchemaObject,
  id: { type: String, required: true },
}

const registeredAxieSchema = new mongoose.Schema<
  IRegisteredAxie,
  IRegisteredAxieModelType
>(registeredAxieSchemaObject)
const nonUniqueRegisteredAxieSchema = new mongoose.Schema<
  IRegisteredAxie,
  IRegisteredAxieModelType
>(nonUniqueRegisteredAxieSchemaObject)

export {
  type IRegisteredAxie,
  type IRegisteredAxieModelType,
  registeredAxieSchema,
  nonUniqueRegisteredAxieSchema,
}
