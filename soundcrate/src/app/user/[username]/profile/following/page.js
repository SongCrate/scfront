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

export default function UserFollowingPage({ params }) {
  const { username } = params;
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const followingIds = await get_following(username);
        const following = await Promise.all(
          followingIds.map(async (userId) => {
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
        setFollowingData(following);
      } catch (error) {
        console.error('Failed to fetch following data:', error);
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