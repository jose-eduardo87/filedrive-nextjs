import NextAuth from "next-auth";

// module augmentation for merging user's ID to the user object returned in session.
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}
