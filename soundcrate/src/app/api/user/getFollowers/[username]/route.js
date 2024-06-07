import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {

  try {
    const username = params.username;
    const user_id = req.headers.get('user_id');

    await connectMongoDB();
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "Requested user does not exist" },
        { status: 404 }
      );
    } else {

      const followerIds = user.followers;
      const followers = await User.aggregate([
        {
          $match: {
            _id: { $in: followerIds }
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'user',
            as: 'userReviews'
          }
        },
        {
          $addFields: {
            reviewCount: { $size: { "$ifNull": [ "$userReviews", [] ] } },
            userIsFollowing: { $in: [user_id_obj , "$followers"] },
          }
        },
        {
          $project: {
            _id: 1,
            username: 1,
            imageUrl: 1,
            reviewCount: 1,
            userIsFollowing: 1,
          }
        }
      ]).exec();

      return NextResponse.json(
        { followers: followers },
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
