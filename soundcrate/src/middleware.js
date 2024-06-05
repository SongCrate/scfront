import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export async function middleware(req) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const req_headers = new Headers(req.headers)
  req_headers.set('user_id', token?.user?._id);
  req_headers.set('username', token?.user?.username);
 
  const response = NextResponse.next({
    request: {
      headers: req_headers,
    },
  })

  return response
}