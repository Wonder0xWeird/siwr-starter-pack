import mongoose from "mongoose"

let MONGODB_URI, MONGODB_DB
if (process.env.NODE_ENV === "development") {
  MONGODB_URI = process.env.DEV_MONGODB_URI
  MONGODB_DB = process.env.DEV_DB_NAME
  console.log(`Using ${MONGODB_DB} database`)
} else {
  MONGODB_URI = process.env.MONGODB_URI
  MONGODB_DB = process.env.DB_NAME
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
      console.log("mongoose connection is global")
    }

    dbConnection = global._mongooseClientPromise
  } else {
    dbConnection = await mongoose.connect(MONGODB_URI)
    console.log("mongoose connection is not global")
  }
})()

export default dbConnection
