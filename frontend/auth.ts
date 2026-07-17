import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT ACCOUNT =", account);

      if (account?.access_token) {
        token.accessToken = account.access_token;

        const response = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        const githubUser = await response.json();

        console.log("GITHUB USER =", githubUser);

        token.login = githubUser.login;
      }

      return token;
    },

    async session({ session, token }) {
      console.log("TOKEN =", token);

      session.accessToken = token.accessToken as string;
      session.login = token.login as string;

      return session;
    },
  },
});