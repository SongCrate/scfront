import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const list_id = searchParams.get('id');

        if (!list_id) {
            return NextResponse.json({ message: "List ID is required" }, { status: 400 });
        }

        await connectMongoDB();

        const deletedList = await SongList.findByIdAndDelete(list_id);

        if (!deletedList) {
            return NextResponse.json({ message: "List not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "List deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
