'use client';

import { useState } from 'react';

export default function SongReviewCard({ username }) {

  const [ isFollowing, setIsFollowing ] = useState(false);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  }

  return (
    <button onClick={handleClick} className={`btn ${isFollowing ? "opacity-80" : "bg-blue"}`}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
