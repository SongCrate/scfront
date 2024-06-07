"use client";

import { 
  get_user,
  get_following,
  get_album_ids,
  get_username,
  get_reviews
} from '/utils';
import { FollowUserCard } from '@/components';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

export default function UserFollowingPage({ params }) {
  const router = useRouter();
  const { username } = params;
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      try {
        const response = await fetch(`/api/users/${username}/getFollowing`);
        const data = await response.json();

        if (response.ok) {
          setFollowingData(data.following);
        } else {
          console.error('Failed to fetch following:', data.error);
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
    return <p>Loading...</p>
  }

  return (
    <main className="flex flex-col gap-4">
      <h2>Following</h2>
      <div className="box-container flex flex-col gap-4">
        {followingData.length > 0 ? (
          followingData.map((user, i) => (
            <FollowUserCard
              key={`follow-user-card-${i}`}
              username={user.username}
              profile_img={user.imageUrl}
              review_count={user.reviewCount}
            />
          ))
        ) : (
          <p className="opacity-40 p-2">Nothing to see here!</p>
        )}
      </div>
    </main>
  );
}