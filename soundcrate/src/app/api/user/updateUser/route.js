import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';

export async function PUT(req) {
  try {
    const user_id = req.headers.get('user_id');
    const { username, imageUrl } = await req.json();
    
    await connectMongoDB();

    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist", status: 400 }
      );
    }

    let updates = {};

    if (username != undefined && username.length) 
      updates.username = username.trim();

    if (imageUrl != undefined && username.length)
      updates.imageUrl = imageUrl.trim();

    await User.updateOne(
      { _id: user_id }, 
      { $set: updates }
    );

    return NextResponse.json(
      { message: "User updated", status: 200 }
    );

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "An error occurred while updating the user.", status: 500 }
    );
  }
}