import { connectMongoDB } from '@/lib/mongodb';
import Review from '@/lib/models/review';
import { NextResponse } from 'next/server';

export async function POST(req){
  try {
    const user_id = req.headers.get('user_id');
    const { 
      song_id,
      album_id,
      rating, 
      review_text 
    } = await req.json();

    await connectMongoDB();

    var review = new Review({
      user: user_id,
      songId: song_id,
      albumId: album_id,
      rating: rating,
    });

    if (Boolean(review_text)) {
      review['text'] = review_text;
    }

    var res = null;

    await Review.create(review)
      .then((doc) => {
        res = NextResponse.json(
          { body: doc }, 
          { status: 200 }
        )
      })
      .catch((error) => {
        throw error;
      });

  } catch (error) {
    console.log(error)
    res = NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    )
  } finally {
    return res;
  }
}