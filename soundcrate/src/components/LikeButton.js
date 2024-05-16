'use client';

import { get_user, is_review_liked, get_review_likes } from '/utils';
import { Heart } from '@phosphor-icons/react';
import { useState } from 'react';

export default function LikeButton({ review_id, size=20 }) {

  const user_id = 1; // mock data, will retrieve this from headers

  // get initial like count to instantiate likeCount state
  const review_likes = get_review_likes(review_id);
  const initial_like_count = Boolean(review_likes) == false ? 0 : review_likes.length;

  const [ isLiked, setIsLiked ] = useState(is_review_liked(user_id, review_id));
  const [ likeCount, setLikeCount ] = useState(initial_like_count);

  const weight = isLiked ? 'fill' : 'bold';
  const classes = isLiked ? 'text-red opacity-80' : 'opacity-40'

  const handleClick = (e) => {
    setIsLiked(!isLiked);
    setLikeCount(likeCount + (isLiked ? -1 : 1));
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button className="flex flex-col items-center gap-1 z-99 padding-3" onClick={handleClick}>
        <Heart weight={weight} size={size} className={classes}/>
      </button>
      <p className="opacity-80">{likeCount?.toString()}</p>
    </div>
  );
}
