import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs';

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email address" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const client = new PrismaClient()
        const userCheck = await client.users.findUnique({
          where: {
            email: credentials?.email,
          }
        })

        if (!userCheck) {
          // Any object returned will be saved in `user` property of the JWT
          client.$disconnect
         
          throw new Error('No user found with the email');

        }

        if (!credentials?.password || !userCheck.password) {
          client.$disconnect
        
          throw new Error('Please enter correct password')
        }

        const checkPassword = await compare(credentials.password, userCheck.password)
        if (!checkPassword) {
          client.$disconnect
          
          throw new Error("Password doesn't match")
        } 
          client.$disconnect
          return userCheck
        

      }
    })
  ],
  pages: {
    signIn: '/signin'
  }
});
