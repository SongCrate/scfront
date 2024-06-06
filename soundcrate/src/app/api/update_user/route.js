import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import User from '@/lib/models/user';

export async function PUT(request, { params }) {
  try {
    const og_username = params.username;

    const body = await request.json();
    const { username, image_url } = body;
    console.log('Received data:', body);

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('users').updateOne(
      { username: og_username },
      { $set: { username: username, image_url: image_url } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: { message: 'Success!' } },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Internal Error: ${error}` },
      { status: 500 }
    );
  }
}