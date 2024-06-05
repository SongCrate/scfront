import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connectMongoDB();

        // find songlists based on a user
        const username = req.nextUrl.searchParams.get('username');
        // const username = params.username;
        // await connectMongoDB();
        const user = await User.findOne({ username })
  
        // make sure the user exists in database
        if (!user) {
            return NextResponse.json(
                { error: "Requested user does not exist" }, 
                { status: 404 }
            )
        } else {

            // get all songlists of such user
            const song_lists = await SongList
                .find({ user: user._id })
                .exec();
            
            // return the songlists
            return NextResponse.json(
                { body: song_lists },
                { status: 200 }
            );
        }
  
      } catch (error) {
            return NextResponse.json(
                { message: "Internal Server Error: " + error },
                { status: 500 }
            )
      }
}
