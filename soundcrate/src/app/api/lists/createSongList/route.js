import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // get title, and description from CreateListModal.js
        const { title, description } = await req.json();
        const user_id = req.headers.get('user_id');

        // make sure that userId, title, and description are provided
        if (!user_id || !title ) {
            return NextResponse.json(
                { message: "Retreived fields: user_id(" + user_id + "), title(" + title + ")" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // create document
        var new_song_list = new SongList({
            user: user_id,
            title: title,
        });

        if (Boolean(description)) {
            review['description'] = description;
        }

        var res = null

        // save the new song list to the database
        await SongList.create(new_song_list)
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