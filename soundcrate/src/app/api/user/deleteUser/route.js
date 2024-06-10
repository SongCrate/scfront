import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from "bcryptjs";

export async function deleteUser(req) {
    try {
        const { id, password } = await req.json();

        await connectMongoDB();

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Incorrect password" }, { status: 404 });
        }

        await User.deleteOne(user);

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "An error occurred while deleting the user." }, { status: 500 });
    }
}

export async function DELETE(req) {
    return deleteUser(req);
}