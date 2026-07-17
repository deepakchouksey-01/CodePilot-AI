import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    login?: string;
  }

  interface Session {
    accessToken?: string;
    login?: string;
    user: DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    login?: string;
  }
}