import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connectMongoDB();

        // Get songId from search parameters
        const song_id = req.nextUrl.searchParams.get('songId');
        const user_id = req.headers.get('user_id');

        // Find songlists by songId and userId
        const songLists = await SongList.find({ 
            user: user_id, 
            songIds: song_id
        }).populate('user', 'username').lean();

        return NextResponse.json(
            { body: songLists }, { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}
