import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
    try {
        const { listId, songId , action } = await req.json();

        // error handling
        if (!listId || !songId) {
            return NextResponse.json(
                { message: 'list or song cannot be found' },
                { status: 400 }
            );
        }

        await connectMongoDB();

        var res = null;
        if (action === 'add') {
            if (!songList.songIds.includes(song_id)) {
                // Add the song ID to the list of song IDs in the specified list
                await SongList.findOneAndUpdate(
                    { _id: listId },
                    { $addToSet: { songIds: songId } },
                    { new: true }
                )
                .then((doc) => {
                    res = NextResponse.json(
                        { body: doc },
                        { status: 200 }
                    ); 
                })
                .catch((error) => {
                    throw error;
                });
            } else {
                return NextResponse.json(
                    { message: 'Song is already in the list' },
                    { status: 400 }
                );
            }
        } else if (action === 'remove') {
            if (songList.songIds.includes(song_id)) {
                // Remove the song ID from the list of song IDs in the specified list
                await SongList.findOneAndUpdate(
                    { _id: listId },
                    { $pull: { songIds: songId } },
                    { new: true }
                )
                .then((doc) => {
                    res = NextResponse.json(
                        { body: doc },
                        { status: 200 }
                    ); 
                })
                .catch((error) => {
                    throw error;
                });
            } else {
                return NextResponse.json(
                    { message: 'Song is already in the list' },
                    { status: 400 }
                );
            }
        } else {
            return NextResponse.json(
                { message: 'Action failed' },
                { status: 400 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { message: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    } finally {
        return res;
    }
}
