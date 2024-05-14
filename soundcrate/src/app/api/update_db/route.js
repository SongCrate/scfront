import { NextResponse } from 'next/server';
const fs = require('fs');
const path = require("path");

export async function POST(request) {
  const body = await request.json();

  try {
    const db_path = path.resolve(__dirname, '../../../../../data/db.json')
    console.log(db_path)
    fs.writeFileSync(db_path, JSON.stringify(body)); 

    return NextResponse.json(
        { data: { message: 'Success!' } }, 
        { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Internal Error: ${error}` },
      { status: 200 },
    );
  }
}