import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req){
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