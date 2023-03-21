import mongoose from "mongoose"

let MONGODB_URI
const MONGODB_DB = process.env.DB_NAME
if (process.env.NODE_ENV === "development") {
  MONGODB_URI = process.env.MONGODB_DEV_URI
  console.log("USING DEV DATABASE")
} else {
  MONGODB_URI = process.env.MONGODB_URI
}

if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environment variable")
}

if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environment variable")
}

let dbConnection
;(async () => {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongooseClientPromise) {
      global._mongooseClientPromise = await mongoose.connect(MONGODB_URI)
      console.log("is global")
    }

    dbConnection = global._mongooseClientPromise
  } else {
    dbConnection = await mongoose.connect(MONGODB_URI)
    console.log("is not global")
  }
})()

export default dbConnection
