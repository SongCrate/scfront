import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';

export async function updateUser(req) {
    try {
        const { id, username, imageUrl } = await req.json();

        await connectMongoDB();

        const user = await User.findOne(username);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updatedData = {};

        if (username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== id) {
                return NextResponse.json({ error: "Username already in use" }, { status: 400 });
            }
            updatedData.username = username;
        }

        if (email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== id) {
                return NextResponse.json({ error: "Email already in use" }, { status: 400 });
            }
            updatedData.email = email;
        }

        if (password) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            updatedData.password = encryptedPassword;
        }

        await User.updateOne({ _id: id }, { $set: updatedData });

        return NextResponse.json({ message: "User updated successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "An error occurred while updating the user." }, { status: 500 });
    }
}

export async function POST(req) {
    return updateUser(req);
}
