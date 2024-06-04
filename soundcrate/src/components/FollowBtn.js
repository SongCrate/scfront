'use client';

import { useState } from 'react';
import { get_user_id, get_followers } from '/utils';

export default function FollowButton({ username }) {
  const user_id = 1; // mock data, will retrieve this from headers
  const follower_ids = get_followers(username);
  const isInitiallyFollowing = follower_ids.includes(user_id);

  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);

  const handleClick = (e) => {
    setIsFollowing(!isFollowing);
    e.stopPropagation();
    e.preventDefault();
  };

  const buttonClasses = isFollowing ? 'opacity-80' : 'bg-blue';

  return (
    <button onClick={handleClick} className={`btn ${buttonClasses}`}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}