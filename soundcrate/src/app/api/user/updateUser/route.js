import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';

export async function updateUser(req) {
    try {
        const { id, username, imageUrl } = await req.json();

        await connectMongoDB();

        const user = await User.findById(id);

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

        if (imageUrl) {
            updatedData.imageUrl = imageUrl;
        }else{
            updatedData.imageUrl = "/images/default-user.png"
        }

        await User.updateOne({ _id: id }, { $set: updatedData });

        return NextResponse.json({ message: "User updated successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "An error occurred while updating the user." }, { status: 500 });
        console.log(error)
    }
}

export async function PUT(req) {
    return updateUser(req);
}
