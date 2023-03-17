import { getServerSession } from "next-auth"
import React from "react"
import Layout from "../../components/layout"
import Account from "../../components/pages/account/Account"

import {
  checkUserAuthentication,
  checkStagingAccess,
} from "../../lib/frontend/sessionChecks"
import { authOptions } from "../api/auth/[...nextauth]"

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (await checkStagingAccess(session)) {
    return {
      redirect: {
        destination: "/connect",
        permanent: false,
      },
    }
  }
  const roleRequirement = "user"
  return checkUserAuthentication(session, roleRequirement)
}
export default function Page(props) {
  return (
    <Layout>
      <Account user={props.user} />
    </Layout>
  )
}
