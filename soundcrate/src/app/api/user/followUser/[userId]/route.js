import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function POST(req, { params }){

  try {
    const target_user_id = params.userId;
    const user_id = req.headers.get('user_id');
    const { action } = await req.json();

    if (target_user_id == user_id) {
        return NextResponse.json(
            { message: 'Cannot follow self' },
            { status: 400 }
        )
    }

    var res = null;

    let action_obj_a = {}; 
    let action_obj_b = {};
    switch(action) {
      case 'follow':
        action_obj_a = { $addToSet: { following: target_user_id } };
        action_obj_b = { $addToSet: { followers: user_id } };
        break;
      case 'unfollow':
        action_obj_a = { $pull: { following: target_user_id } };
        action_obj_b = { $pull: { followers: user_id } };
        break;
      default:
        return NextResponse.json(
          { message: 'Missing "action" field' },
          { status: 400 }
        )
    }

    await connectMongoDB();

    await User.findOneAndUpdate(
      { _id: target_user_id },
      { ...action_obj_b },
      { new: true }
    );

    await User.findOneAndUpdate(
      { _id: user_id },
      { ...action_obj_a },
      { new: true }
    ).then((doc) => {
      res = NextResponse.json(
        { body: 
          { is_following: (doc.following).includes(target_user_id) }
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