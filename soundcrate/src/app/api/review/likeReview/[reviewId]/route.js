import { connectMongoDB } from '@/lib/mongodb';
import Review from '@/lib/models/review';
import { NextResponse } from 'next/server';

export async function POST(req, { params }){

  console.log(req.headers);

  const user_id = req.headers.get('user_id');

  if (user_id == undefined) {
    return NextResponse.json(
      { message: 'Unauthorized', status: 401 }
    )
  }

  try {
    const review_id = params.reviewId;
    const { action } = await req.json();

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