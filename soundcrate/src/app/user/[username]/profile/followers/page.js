'use client';

import { useState, useEffect } from 'react';
import { FollowUserCard } from '@/components';
import { useRouter } from 'next/navigation';

export default function UserFollowersPage({ params }) {
  const router = useRouter();
  const { username } = params;
  const [followerData, setfollowerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      try {
        const response = await fetch(`/api/users/${username}/followers`);
        const data = await response.json();

        if (response.ok) {
          setfollowerData(data.followers);
        } else {
          console.error('Failed to fetch followers:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch followers:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col gap-4">
      <h2>Followers</h2>
      <div className="box-container flex flex-col gap-4">
        {followerData.length > 0 ? (
          followerData.map((user, i) => (
            <FollowUserCard
              key={`follow-user-card-${i}`}
              username={user.username}
              profile_img={user.profile_img}
              review_count={user.review_count}
              album_count={user.album_count}
            />
          ))
        ) : (
          <p className="opacity-40 p-2">Nothing to see here!</p>
        )}
      </div>
    </main>
  );
}
