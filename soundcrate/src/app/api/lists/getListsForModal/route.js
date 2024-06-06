import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';
// import User from '@/lib/models/user';
import {useSession} from "next-auth/react";
import { getSession } from 'next-auth/react';

export async function GET(req) {
    try {
        await connectMongoDB();


        // find songlists based on a user who is logged in
        // const { data: session } = useSession();
        // const user = session?.user;
        const session = await getSession({ req });
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "User not authenticated" }, 
                { status: 401 }
            );
        }
        const user = session.user;
  
        // make sure the user exists in database
        if (!user) {
            return NextResponse.json(
                { error: "Requested user does not exist" }, 
                { status: 404 }
            )
        } else {

            // get all songlists of such user
            const song_lists = await SongList
                .find({ user: user._id })
                .exec();
            
            // return the songlists
            return NextResponse.json(
                { body: song_lists },
                { status: 200 }
            );
        }
  
      } catch (error) {
            return NextResponse.json(
                { message: "Internal Server Error: " + error },
                { status: 500 }
            )
      }
}
