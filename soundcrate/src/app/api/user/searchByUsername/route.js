import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import Review from '@/lib/models/review';
import { NextResponse } from 'next/server';
const mongoose = require('mongoose');

export async function GET(req){
  try {
    const user_id = req.headers.get('user_id');
    let user_id_obj = (user_id !== 'undefined') ? new mongoose.Types.ObjectId(user_id) : null;

    const search_params = Object.fromEntries(req.nextUrl.searchParams.entries());
    if (!('q' in search_params)) {
      return NextResponse.json(
        { error: "Missing 'q' field" }, 
        { status: 400 }
      )
    }

    await connectMongoDB();

    const users = await User.aggregate([
      { 
        $match: { 
          username: { $regex: search_params.q },
          _id: { $ne: user_id_obj }
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
          followers: 1,
          userIsFollowing: 1,
        }
      }
    ]).exec();

  console.log(users)

  return NextResponse.json(
    { body: { users }
    }, 
    { status: 200 }
  )

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}