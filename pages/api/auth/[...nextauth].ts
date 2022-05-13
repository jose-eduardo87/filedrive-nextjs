import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "lib/prisma";
import user from "models/User";
import type { NextApiHandler } from "next";
import { Session, User } from "next-auth";
import { DEFAULT_AVATAR } from "helpers/constants";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const authorizedUser = await user.findUnique({
          where: { email: credentials!.email },
        });
        const isVerified = await user.verifyPassword(
          credentials!.password,
          authorizedUser!.password!
        );

        // if (!authorizedUser || !isVerified) {
        //   throw new Error("No user found or wrong password.");
        // }

        return { email: authorizedUser!.email };
      },
    }),
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
