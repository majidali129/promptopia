import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { User } from "@/models/user.model";
import { connectDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      // Store userId from mongoDB to session, to track which user is online
      const userSession = await User.findOne({ email: session.user.email });
      session.user.id = userSession._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectDB();
        // check if user already exist
        const userExists = await User.findOne({ email: profile.email });
        // if not, create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST };
