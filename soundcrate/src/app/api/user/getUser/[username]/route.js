import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import Review from '@/lib/models/review';
import SongList from '@/lib/models/songList';
import { NextResponse } from 'next/server';

export async function GET(req, {params}){
    try {
      const username = params.username;

      await connectMongoDB();
      const user = await User.findOne({ username })

      if (!user) {
        return NextResponse.json(
          { error: "Requested user does not exist" }, 
          { status: 404 }
        )
      } else {

        // get profile statistics to pass in response body
        const reviews = await Review.find({ user: user._id });

        const song_lists = await SongList.find({ user: user._id });
        
        const album_ids = reviews.map((review) => { return review.albumId; });
        const unique_album_ids = [...new Set(album_ids)];
        
        return NextResponse.json(
          { body: {
              user, 
              'reviewCount': reviews.length, 
              'albumCount': unique_album_ids.length, 
              'listCount': song_lists.length 
            }
          }, 
          { status: 200 }
        )
      }

    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      )
    }
}