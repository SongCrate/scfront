'use client';

import { FollowUserCard } from '@/components';
import { useState, useEffect } from 'react';

export default function UserFollowerPage({ params }) {
  const { username } = params;
  const [ followerData, setFollowerData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      try {
        const response = await fetch(`/api/user/getFollowers/${username}`);
        const data = await response.json();

        if (response.ok) {
          setFollowerData(data.followers);
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
        {followerData?.length > 0 ? (
          followerData.map((user, i) => (
            <FollowUserCard
              key={`follow-user-card-${i}`}
              username={user.username}
              user_id={user._id}
              profile_img={user.imageUrl}
              review_count={user.reviewCount}
              user_is_following={user.userIsFollowing}
            />
          ))
        ) : (
          <p className="opacity-40 p-2">Nothing to see here!</p>
        )}
      </div>
    </main>
  );
}