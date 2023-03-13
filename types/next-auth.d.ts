import "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    address: string
    username: string
    id: number
    role: string
  }

  interface Session {
    user: {
      address: string
      username: string
      id: number
      role: string
    } & DefaultSession["user"]
  }
}
