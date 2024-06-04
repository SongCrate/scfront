import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const authOptions ={
    // configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },

            },
            async authorize(credentials){

                await connectMongoDB();

                try{
                    const user = await User.findOne({email: credentials.email});
                    // console.log(user);

                    if(user){
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                        if (isPasswordCorrect){
                            return user;
                        }
                    }
                    return null; // Return null if authentication fails
                }catch(error){
                    throw new Error(error);
                    return null; // Return null if an error occurs
                }
            }
        }),
        //add more
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Attach user data to token object
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            // Attach user data to session object
            if (token.user) {
                session.user = token.user;
                session.status = "authenticated";
            }else{
                session.status = "unauthenticated";
            }
            return session;
        },
    },
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };