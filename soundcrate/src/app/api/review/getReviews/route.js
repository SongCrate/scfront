import { connectMongoDB } from '@/lib/mongodb';
import Review from '@/lib/models/review';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function GET(req){
  try {
    await connectMongoDB();
    const search_params = Object.fromEntries(req.nextUrl.searchParams.entries());

    // initialize an object to filter reviews
    let filter_query = {};
    
    // add in filters specified in search params
    if ('userId' in search_params) { filter_query.user = search_params.userId };
    if ('songId' in search_params) { filter_query.songId = search_params.songId };
    
    const reviews = await Review.find(filter_query).populate('user').exec();

    return NextResponse.json(
      { body: reviews }, 
      { status: 200 }
    )

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error}` },
      { status: 500 }
    )
  }
}