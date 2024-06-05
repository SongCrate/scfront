import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
    try {
        const { listId, songId } = await req.json();

        // error handling
        if (!listId || !songId) {
            return NextResponse.json(
                { message: 'list or song cannot be found' },
                { status: 400 }
            );
        }

        await connectMongoDB();

        var res = null;

        // Add the song ID to the list of song IDs in the specified list
        await SongList.findOneAndUpdate(
            { _id: listId },
            { $addToSet: { songIds: songId } },
            { new: true }
        )
        .then((doc) => {
            res = NextResponse.json(
                { body: doc },
                // OR IS IT BELOW??????
                // { body: 
                //     { songIds: doc.songIds }
                // },
                { status: 200 }
            ); 
        })
        .catch((error) => {
            throw error;
        });

    } catch (error) {
        return NextResponse.json(
            { message: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    } finally {
        return res;
    }
}
