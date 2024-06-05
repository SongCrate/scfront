import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // get user ID, title, and description
        const {user_id, list_title, list_description } = await req.json();

        // make sure that userId, title, and description are provided
        if (!user_id || !list_title || !list_description) {
            return NextResponse.json(
                { message: user_id + ", " + list_title + ", " + list_description },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // const username = req.nextUrl.searchParams.get('username');
        // const user = await User.findOne({ username })

        // create document
        var songlist = new SongList({
            user: user_id,
            title: list_title,
            desciption: list_description,
            songIds: [],
        });

        var res = null

        // save the new song list to the database
        await SongList.create(songlist).then((doc) => {
            res = NextResponse.json(
                { body: doc },
                { status: 200 }
            )
        }).catch((error) => {
            console.log(error);
        })

        // save the new song list to the database (???)
        // const songlist = new SongList({
        //     user: user._id,
        //     title: list_title,
        //     description: list_description,
        //     songIds: [],
        // });

        // const doc = await songlist.save();

        // return NextResponse.json({ body: doc }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error: " + error },
            { status: 500 }
        ); 
    } 
    // finally {
    //     return res;
    // }
}