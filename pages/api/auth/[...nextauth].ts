import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import { DEFAULT_AVATAR } from "helpers/constants";
import type { NextApiHandler } from "next";
import { Session, User } from "next-auth";

const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // CredentialsProvider({
    //   async authorize(credentials, req) {
    //     console.log(credentials);
    //   }
    // })
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      session.user.id = user.id;
      session.user.image = session.user.image || DEFAULT_AVATAR;

      return session;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
