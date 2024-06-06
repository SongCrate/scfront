import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connectMongoDB();

        // get song list ID from request
        const list_id = req.nextUrl.searchParams.get('id');

        // find the song list by ID
        const songList = await SongList.findById(list_id);

        // check if the song list exists
        if (!songList) {
            return NextResponse.json(
                { error: "Song list does not exist" }, 
                { status: 404 }
            );
        }

        // return the song list data
        return NextResponse.json(
            { list: songList },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error: " + error },
            { status: 500 }
        );
    }
}
