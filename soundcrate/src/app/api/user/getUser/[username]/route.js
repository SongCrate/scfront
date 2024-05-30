import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
// import Review from '@/lib/models/review';
// import SongList from '@/lib/models/';
import { NextResponse } from 'next/server';

export async function GET(req, {params}){
    try {
      const username = params.username;
      console.log(username)

      await connectMongoDB();
      console.log('connected to mongodb')
      const user = await User.findOne({ username })

      if (!user) {
        return NextResponse.json(
          { error: "Requested user does not exist" }, 
          { status: 404 }
        )
      } else {

        return NextResponse.json(
          { body: {
              user, 
              'reviewCount': 1, 
              'albumCount': 1, 
              'listCount': 2 
            }
          }, 
          { status: 200 }
        )
      }

    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      )
    }
}