'use client';

import { FollowUserCard } from '@/components';
import { useState, useEffect } from 'react';

export default function UserFollowingPage({ params }) {
  const { username } = params;
  const [ followingData, setFollowingData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      try {
        const response = await fetch(`/api/user/getFollowing/${username}`);
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
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <main className="flex flex-col gap-4">
      <h2>Following</h2>
      <div className="box-container flex flex-col gap-4">
        {followingData?.length > 0 ? (
          followingData.map((user, i) => {console.log(user.userIsFollowing); return (
            user && <FollowUserCard
              key={`follow-user-card-${i}`}
              username={user.username}
              user_id={user._id}
              profile_img={user.imageUrl}
              review_count={user.reviewCount}
              user_is_following={user.userIsFollowing}
            />
          )})
        ) : (
          <p className="opacity-40 p-2">Nothing to see here!</p>
        )}
      </div>
    </main>
  );
}