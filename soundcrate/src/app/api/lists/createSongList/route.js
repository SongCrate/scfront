import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // get user ID, title, and description from CreateListModal.js
        const { 
            user_id, 
            title, 
            description
        } = await req.json();

        // make sure that userId, title, and description are provided
        if (!user_id || !title || !description) {
            return NextResponse.json(
                { message: "Retreived fields:" + user_id + ", " + title + ", " + description },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // create document
        var songlist = new SongList({
            user: user_id,
            title: title,
            description: description,
            songIds: [],
        });

        var res = null

        // save the new song list to the database
        await SongList.create(songlist)
            .then((doc) => {
                res = NextResponse.json(
                    { body: doc },
                    { status: 200 }
                )
            }).catch((error) => {
                console.log(error);
                throw error;
            })

    } catch (error) {
        console.log(error)
        res = NextResponse.json(
            { message: error },
            { status: 500 }
        ); 
    } finally {
        return res;
    }
}