import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';
import User from '@/lib/models/user';

export async function GET(req) {
    try {
        await connectMongoDB();

        // find songlists based on a user
        const user_id = req.headers.get('user_id');

        // get all songlists of such user
        const song_lists = await SongList
            .find({ user: user_id })
            .populate('user')
            .exec();
        
        // return the songlists
        return NextResponse.json(
            { body: song_lists },
            { status: 200 }
        );
        
  
      } catch (error) {
            return NextResponse.json(
                { message: "Internal Server Error: " + error },
                { status: 500 }
            )
      }
}
