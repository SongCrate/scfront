"use client";
import { 
  get_user,
  get_followers,
  get_album_ids,
  get_username,
  get_reviews
} from '/utils';
import { FollowUserCard } from '@/components';
import { useState, useEffect } from 'react';

export default function UserFollowersPage({ params }) {
  const { username } = params;
  const [followerData, setfollowerData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const followerIds = await get_followers(username);
        const followers = await Promise.all(
          followerIds.map(async (userId) => {
            const username = await get_username(userId);
            const user = await get_user(username);
            const reviews = await get_reviews(username);
            const albums = await get_album_ids(username);

            return {
              username,
              profile_img: user.image_url,
              review_count: reviews.length,
              album_count: albums.length,
            };
          })
        );
        setfollowerData(followers);
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