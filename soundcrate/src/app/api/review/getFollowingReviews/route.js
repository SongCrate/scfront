import { connectMongoDB } from '@/lib/mongodb';
import Review from '@/lib/models/review';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function GET(req){
  try {
    const user_id = req.headers.get('user_id');
    await connectMongoDB();

    const user = await User.findOne(
      { _id: user_id },
      { 'following' :1 }
    );

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const followingIds = user.following;
    
    const reviews = await Review
      .aggregate([
        {
          $match: {
            user: { $in: followingIds }
          }
        },
        { // apply sorting
          $sort: { createdAt : -1 }
        },
        { // populate with user
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: { 
            path: '$user',
          }
        },
        { 
          $project: { "user": {
            email: 0,
            password: 0,
            followers: 0,
            following: 0,
            createdAt: 0,
            updatedAt: 0
          } } 
        }
      ])
      .exec();

    return NextResponse.json(
      { body: reviews }, 
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error}` },
      { status: 500 }
    )
  }
}