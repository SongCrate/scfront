import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from "bcryptjs";
import {createServerOnlyClientOnlyAliases} from "next/dist/build/create-compiler-aliases";

export async function updateCredentials(req) {
    try {
        const { id, email, password } = await req.json();

        await connectMongoDB();

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updatedData = {};

        if (email) {
            const existingEmail = await User.findOne({ email });
            // console.log("test1");
            if (existingEmail && existingEmail._id.toString() !== id) {
                // console.log("here");
                return NextResponse.json({ error: "Email already in use" }, { status: 400 });
            }
            updatedData.email = email;
        }

        if (password) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            updatedData.password = encryptedPassword;
        }else{
            updatedData.password = password
        }

        await User.updateOne({ _id: id }, { $set: updatedData });

        return NextResponse.json({ message: "User updated successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "An error occurred while updating the user." }, { status: 500 });
        console.log(error)
    }
}

export async function PUT(req) {
    return updateCredentials(req);
}
