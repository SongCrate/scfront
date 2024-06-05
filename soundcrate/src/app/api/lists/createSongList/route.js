import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // get user ID, title, and description
        const { user_id, list_title, list_description } = await req.json();

        // make sure that userId, title, and description are provided
        if (!user_id || !list_title || !list_description) {
            return NextResponse.json(
                { message: 'user needs to input title and description' },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // create document
        var songlist = new SongList({
            user: user_id,
            title: listlist_title,
            desciption: list_description,
            songIds: [],
        });

        var res = null

        // save the new song list to the database
        await SongList.create(songlist).then((doc) => {
            res = NextResponse.json(
                { body: doc },
                { status: 200}
            )
        }).catch((error) => {
            throw error;
        })

        // save the new song list to the database (???)
        // await songlist.save();

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error: " + error },
            { status: 500 }
        ); 
    } finally {
        return res;
    }
}