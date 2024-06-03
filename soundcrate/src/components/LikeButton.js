'use client';

import { Heart } from '@phosphor-icons/react';
import { useState } from 'react';

export default function LikeButton({ review_id, likes=[], compact=true, size=20 }) {

  const user_id = '664690bb36aa3aa3e8c8d240'; // mock data, will retrieve this from headers

  const [ isLiked, setIsLiked ] = useState(likes.includes(user_id));
  const [ likeCount, setLikeCount ] = useState(likes.length);

  // styling for heart icon depending on isLiked state
  const weight = isLiked ? 'fill' : 'bold';
  const classes = isLiked ? 'text-red opacity-80' : 'opacity-40'

  const handleClick = (e) => {

    async function toggleLike(review_id) {
      try {
        const req_body = {
          user_id,
          action: isLiked ? 'unlike' : 'like'
        }

        const response = await fetch(
          `/api/review/likeReview/${review_id}`, 
          { method: 'POST',
            body: JSON.stringify(req_body)
          }
        );
    
        const responseData = await response.json();

        if (responseData?.body) {
          if (responseData.body.like_count != likeCount) {
            setIsLiked(responseData.body.is_liked);
            setLikeCount(responseData.body.like_count);
          } else {
            throw "Action unsuccessful";
          };
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }
    }

    toggleLike(review_id);
    e.stopPropagation();
    e.preventDefault();
  }

  return (compact 
      ? <div className="flex flex-col items-center gap-1">
          <button className="flex flex-col items-center gap-1 z-99 padding-3" onClick={handleClick}>
            <Heart weight={weight} size={size} className={classes}/>
          </button>
          <p className="opacity-80">{likeCount?.toString()}</p>
        </div>

      : <div className="flex flex-row gap-2">
          <button className="flex flex-col items-center gap-1 z-99 padding-3" onClick={handleClick}>
            <Heart weight={weight} size={size} className={classes}/>
          </button>
          <p className="opacity-60 text-sm">{likeCount?.toString()} {likeCount == 1 ? 'like' : 'likes' }</p>
        </div>
  )

}
