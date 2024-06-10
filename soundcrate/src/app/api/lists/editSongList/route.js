import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
    try {
        const { list_id, title, description } = await req.json();

        // Ensure that the list_id and title are provided
        if (!list_id || !title) {
            return NextResponse.json(
                { message: "Required fields: list_id, title" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // Find the song list by ID and update it
        const updatedList = await SongList.findByIdAndUpdate(
            list_id,
            { 
                title: title,
                description: description },
            { new: true }
        );

        if (!updatedList) {
            return NextResponse.json(
                { message: "List not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { body: updatedList },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
