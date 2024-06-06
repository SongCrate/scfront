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
      const followerIds = user.followers;

      const followers = await User.find({ _id: { $in: followerIds } });

      const followerData = followers.map(follower => ({
        username: follower.username,
        profile_img: follower.image_url,
        review_count: follower.reviews.length, // Adjust this according to your schema
        album_count: follower.albums.length, // Adjust this according to your schema
        list_count: follower.lists.length // Adjust this according to your schema
      }));

      return NextResponse.json(
        { followers: followerData },
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