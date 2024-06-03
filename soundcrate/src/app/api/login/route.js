import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';

export async function login(req){
    try{
        const {email, password} = await req.json();
        const encryptedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }else{
            return NextResponse.json({
                id: user._id,
                password: user.password,
                username: user.username,
                email: user.email,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        }

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        return response;

    }catch(error){
        return NextResponse.json({
            message: "An error occurred while logging in the user."}, {status: 500}
        )
    }
}

export async function POST(req) {
    return login(req);
}