import { connectMongoDB } from '@/lib/mongodb';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';
// import {useSession} from "next-auth/react";

export async function GET(req) {
    try {
        await connectMongoDB();

        // find songlists based on a user who is logged in
        // const { data: session } = useSession();
        // const user = session?.user;
        // HARDCODED FOR JANEDOE ***************************************
        // useSession is used in commented-out code ********************
        const user_id = '665d372fefa975bc0c6ad44d';

  
        // // error-handling: make sure the user exists in database
        // if (!user) {
        //     return NextResponse.json(
        //         { error: "Requested user does not exist" }, 
        //         { status: 404 }
        //     )
        // } else {

            // get all songlists of such user
            const song_lists = await SongList
                .find({ user: user_id })
                .exec();
            
            // return the songlists
            return NextResponse.json(
                { body: song_lists },
                { status: 200 }
            );
        // }
  
      } catch (error) {
            return NextResponse.json(
                { message: "Internal Server Error: " + error },
                { status: 500 }
            )
      }
}
