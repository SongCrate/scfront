import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';
import User from '@/lib/models/user';

export async function GET(req) {
    try {
        await connectMongoDB();

        // find songlists based on the profile NOT user logged in
        // const user_id = req.headers.get('user_id');
        
        // Extract the username from the query parameters
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { message: "Username is required" },
                { status: 400 }
            );
        }

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }




        // get all songlists of such user
        const song_lists = await SongList
            .find({ user: user._id })
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
