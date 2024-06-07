import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connectMongoDB();

        // Get songId from search parameters
        const song_id = req.nextUrl.searchParams.get('songId');
        const user_id = req.headers.get('user_id');

        let song_lists;

        if (user_id != "undefined") {

            // get song lists from logged-in user
            const user_song_lists = await SongList.find({ 
                user: user_id, 
                songIds: song_id
            }).populate('user', 'username').lean();

            // get song lists from all other users
            const other_song_lists = await SongList.find({ 
                user: { $ne: user_id },
                songIds: song_id
            }).populate('user', 'username').lean();
            
            // combine the lists
            song_lists = [...user_song_lists, ...other_song_lists];

        } else {
            // get all song lists that contain the songId
            song_lists = await SongList.find({ 
                songIds: song_id
            }).populate('user', 'username').lean();
        }

        return NextResponse.json(
            { body: song_lists }, { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}
