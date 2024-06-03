import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import {NextResponse} from "next/server";

export const authOptions:any = {
    // configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials:any){
                try{
                    const { username, email, password } = await req.json();
                    const encryptedPassword = await bcrypt.hash(password, 10);

                    await connectMongoDB();

                    const user = await User.findOne({email})

                    if(user){
                        return NextResponse.json({error: "User already exists"}, {status: 400})
                    }

                    await User.create({username, email, password: encryptedPassword});

                    return NextResponse.json({message: "user registered"}, {status: 201});

                }catch(error){
                    return NextResponse.json({
                        message: "An error occurred while registering the user."}, {status: 500}
                    )
                }
            }
        }),
        //add more
    ]
}
