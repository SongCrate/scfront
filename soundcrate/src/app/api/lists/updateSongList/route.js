import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
    try {
        const { listId, songId , action } = await req.json();
        const user_id = req.headers.get('user_id');

        // error handling
        if (!listId || !songId) {
            return NextResponse.json(
                { message: 'list or song cannot be found' },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const songList = await SongList.findById(listId);

        if (!songList) {
            return NextResponse.json(
                { message: 'Song list not found' },
                { status: 404 }
            );
        }

        if (songList.user != user_id) {
            return NextResponse.json(
                { message: 'Unauthorized user' },
                { status: 401 }  
            )
        }

        let updatedList;
        if (action === 'add') {
            if (!songList.songIds.includes(songId)) {
                updatedList = await SongList.findByIdAndUpdate(
                    listId,
                    { $addToSet: { songIds: songId } },
                    { new: true }
                );
            } else {
                return NextResponse.json(
                    { message: 'Song is already in the list' },
                    { status: 400 }
                );
            }
        } else if (action === 'remove') {
            if (songList.songIds.includes(songId)) {
                updatedList = await SongList.findByIdAndUpdate(
                    listId,
                    { $pull: { songIds: songId } },
                    { new: true }
                );
            } else {
                return NextResponse.json(
                    { message: 'Song is not in the list' },
                    { status: 400 }
                );
            }
        } else {
            return NextResponse.json(
                { message: 'Invalid action' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { body: updatedList },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}