import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const username = params.username;

    await connectMongoDB();
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "Requested user does not exist" },
        { status: 404 }
      );
    } else {
      // Assuming the User model has a followers field which is an array of user IDs
      const followingIds = user.following;

      const following = await User.find({ _id: { $in: followingIds } });

      const followingData = following.map(following => ({
        username: following.username,
        profile_img: following.image_url,
        review_count: following.reviews.length, // Adjust this according to your schema
        album_count: following.albums.length, // Adjust this according to your schema
        list_count: following.lists.length // Adjust this according to your schema
      }));

      return NextResponse.json(
        { following: followingData },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error fetching followers:', error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}