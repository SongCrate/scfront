import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req){
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
            return NextResponse.json({ username: user.username });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, process.env.NEXTAUTH_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    }catch(error){
        return NextResponse.json({
            message: "An error occurred while registering the user."}, {status: 500}
        )
    }
}