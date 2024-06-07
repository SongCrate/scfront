'use client';

import { redirect } from 'next/navigation';

export default function UserPage({ params }) {
  const { username } = params;
  redirect(`${username}/profile`);

  return null;
}
