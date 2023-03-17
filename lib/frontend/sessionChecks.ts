export async function checkStagingAccess(session) {
  if (process.env.STAGING === "true") {
    if (!session || session.user.role !== "admin") {
      return true
    } else {
      return null
    }
  }
}

export async function checkUserAuthentication(
  session,
  roleRequirement = "default",
  currentPage = "default"
) {
  const isNotLoggedIn = !session

  if (isNotLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const hasNoUsername = !session.user.username
  const isNotAdmin = session.user.role !== "admin"
  const isNotVIP = session.user.role !== "VIP"

  if (hasNoUsername) {
    if (currentPage !== "update") {
      return {
        redirect: {
          destination: "/account/update",
          permanent: false,
        },
      }
    }
  }

  if (roleRequirement === "VIP") {
    if (isNotVIP && isNotAdmin) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }

  if (roleRequirement === "admin") {
    if (isNotAdmin) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }

  return {
    props: {
      ...session,
    },
  }
}
