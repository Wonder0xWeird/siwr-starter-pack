import mongoose from "mongoose"

let MONGODB_URI
const MONGODB_DB = process.env.DB_NAME
if (process.env.NODE_ENV === "development") {
  MONGODB_URI = process.env.MONGODB_DEV_URI
  console.log("USING DEV DATABASE")
} else {
  MONGODB_URI = process.env.MONGODB_URI
}

// Check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environment variable")
}

// Check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environment variable")
}

let dbConnection
;(async () => {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (hot module replacement).
    if (!global._mongooseClientPromise) {
      global._mongooseClientPromise = await mongoose.connect(MONGODB_URI)
      console.log("is global")
    }

    dbConnection = global._mongooseClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    dbConnection = await mongoose.connect(MONGODB_URI)
    console.log("is not global")
  }
})()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
// module.exports = clientPromise;
export default dbConnection
