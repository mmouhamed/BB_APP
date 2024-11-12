import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ExecuteQuery from "@/app/db/pgDBconfig"; // Adjust the import based on your structure

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // const query = 'SELECT * FROM BB_USERS WHERE USER_NAME = @username AND PASSWORD = @password';
        const query =
          'SELECT * FROM bb_users WHERE user_name = $1 AND "PASSWORD" = $2';
        // const params = {
        //   username: credentials.username,
        //   password: credentials.password, // Remember to hash passwords in production!
        // };
        const params = [credentials.username, credentials.password]; // Array of parameters

        try {
          const results = await ExecuteQuery(query, params);
          const user = results[0];

          if (user) {
            return {
              id: user.USER_ID,
              name: user.DISPLAY_NAME,
              email: user.EMAIL,
            };
          }
          return null; // Return null if user is not found
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Error validating user");
        }
      },
    }),
  ],
  pages: {
    signIn: "/user/login", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

// Export the NextAuth handler as a default export
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
