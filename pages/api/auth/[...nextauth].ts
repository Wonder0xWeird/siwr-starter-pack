import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ILoginRequestBody } from "../../../components/pages/connect/Connect"
import {
  authorizeRonin,
  authorizeLogin,
} from "../../../lib/backend/api/auth/auth"
import { IConnectRequestBody } from "../../../lib/frontend/wallet"

export const authOptions: NextAuthOptions = {
  providers: [
    // RONIN PROVIDER AUTHENTICATION
    CredentialsProvider({
      id: "ronin",
      name: "Sign-in With Ronin",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
        nonce: {
          label: "Nonce",
          type: "text",
        },
      },
      async authorize(credentials: IConnectRequestBody) {
        return await authorizeRonin(credentials)
      },
    }),

    // STANDARD ACCOUNT PROVIDER AUTHENTICATION
    CredentialsProvider({
      id: "login",
      name: "Login",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username...",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "password...",
        },
      },
      async authorize(credentials: ILoginRequestBody) {
        return await authorizeLogin(credentials)
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  // debug: true,

  callbacks: {
    async signIn({ account }) {
      if (account.provider === "ronin" || account.provider === "login") {
        return true
      }
      return false
    },
    async jwt({ token, user }) {
      if (user) {
        token = {
          address: user.address,
          username: user.username,
          id: user.id,
          role: user.role,
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        address: token.address,
        username: token.username,
        id: token.id,
        role: token.role,
      }
      return session
    },
    // async redirect({ url, baseUrl }) {
    //   const redirect = "/dashboard"
    //   return baseUrl + redirect
    // },
  },
}

export default NextAuth(authOptions)
