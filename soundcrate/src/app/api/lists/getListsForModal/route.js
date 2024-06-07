import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connectMongoDB();

        // get song lists for the user who is logged in
        const user_id = req.headers.get('user_id');

        const song_lists = await SongList
            .find({ user: user_id })
            .exec();
            
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
