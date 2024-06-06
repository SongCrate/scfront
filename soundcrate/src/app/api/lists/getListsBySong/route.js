import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connectMongoDB();

        // Get songId and userId from the request
        const songId = req.nextUrl.searchParams.get('songId');
        const session = await getSession({ req });

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            );
        }

        const userId = session.user._id;

        // Find songlists by songId and userId
        const songLists = await SongList.find({ 
            user: userId, 
            songIds: songId 
        }).populate('user', 'username').lean();

        return NextResponse.json({ body: songLists }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
