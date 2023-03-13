import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export async function checkStagingAccess(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (process.env.STAGING === "true") {
    if (!session || session.user.role !== "admin") {
      return true
    } else {
      return null
    }
  }
}
