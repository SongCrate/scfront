import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';

export async function register(req){
    try{
        const { username, email, password } = await req.json();
        const encryptedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();

        const existingEmail = await User.findOne({email});
        const existingUsername = await User.findOne({username});

        if (existingEmail) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        if (existingUsername) {
            return NextResponse.json({ error: "Username already in use" }, { status: 400 });
        }

        await User.create({username, email, password: encryptedPassword});

        return NextResponse.json({message: "user registered"}, {status: 201});

    }catch(error){
        return NextResponse.json({
            message: "An error occurred while registering the user."}, {status: 500}
        )
    }
}

export async function POST(req) {
    return register(req);
}