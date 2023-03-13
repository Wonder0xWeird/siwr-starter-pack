import mongoose from "mongoose"
import { type IUser, userSchema } from "./user"

/*** REGISTERED AXIES ***/
interface IRegisteredAxie {
  _id: mongoose.Types.ObjectId
  registeredBy: IUser
  axieId: number
  class: string
  body: string
  color: string
  parts: {
    eyes: {
      skillName: string
      skillLevel: number
    }
    ears: {
      skillName: string
      skillLevel: number
    }
    back: {
      skillName: string
      skillLevel: number
    }
    mouth: {
      skillName: string
      skillLevel: number
    }
    horn: {
      skillName: string
      skillLevel: number
    }
    tail: {
      skillName: string
      skillLevel: number
    }
  }
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
  axieId: {
    type: Number,
    required: true,
    unique: true,
  },
  class: String,
  body: String,
  color: String,
  parts: {
    eyes: {
      skillName: String,
      skillLevel: Number,
    },
    ears: {
      skillName: String,
      skillLevel: Number,
    },
    back: {
      skillName: String,
      skillLevel: Number,
    },
    mouth: {
      skillName: String,
      skillLevel: Number,
    },
    horn: {
      skillName: String,
      skillLevel: Number,
    },
    tail: {
      skillName: String,
      skillLevel: Number,
    },
  },
  seasonsEnlisted: {
    type: [
      {
        season: Number,
        isEnlisted: Boolean,
        user: userSchema,
      },
    ],
    default: [],
  },
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
  axieId: { type: Number, required: true },
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
