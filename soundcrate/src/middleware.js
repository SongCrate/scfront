import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

function is_protected(path) {
  if (path.startsWith('/api/review/likeReview')) 
    return true;
  else if (path.startsWith('/api/review/postReview')) 
    return true;
  else 
    return false;
}
 
export async function middleware(req) {

  // get auth token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const user_id = token?.user?._id;
  const username = token?.user?.username;

  // set request headers with user information
  const req_headers = new Headers(req.headers)
  req_headers.set('user_id', user_id);
  req_headers.set('username', username);

  // return 401 status for any protected routes if user is not logged in
  if (user_id == undefined && is_protected(req.nextUrl.pathname)) {
    return NextResponse.json(
      { message: 'Unauthorized', status: 401 }
    )
  }

  const response = NextResponse.next({
    request: {
      headers: req_headers,
    },
  })

  return response
}