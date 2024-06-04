import { connectMongoDB } from '@/lib/mongodb';
import Review from '@/lib/models/review';
import { NextResponse } from 'next/server';

export async function POST(req, { params }){
  try {
    const review_id = params.reviewId;
    const { user_id, action } = await req.json(); // TODO: retrieve user id from headers instead

    await connectMongoDB();

    var res = null;

    let action_obj = {};
    switch(action) {
      case 'like':
        action_obj = { $addToSet: { likes: user_id } };
        break;
      case 'unlike':
        action_obj = { $pull: { likes: user_id } };
        break;
      default:
        return NextResponse.json(
          { message: 'Missing "action" field' },
          { status: 400 }
        )
    }

    await Review.findOneAndUpdate(
      { _id: review_id },
      { ...action_obj },
      { new: true }
    ).then((doc) => {
      res = NextResponse.json(
        { body: 
          {
            like_count: (doc.likes).length,
            is_liked: (doc.likes).includes(user_id)
          }
        }, 
        { status: 200 }
      )
    })
    .catch((error) => {
      throw error;
    });

  } catch (error) {
    res = NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    )
  } finally {
    return res;
  }
}