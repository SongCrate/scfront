'use client';

import { Heart } from '@phosphor-icons/react';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useModalContext } from '@/app/ModalContextProvider/ModalContextProvider';

export default function LikeButton({ review_id, likes=[], compact=true, size=20 }) {

  const { data: session } = useSession();
  const user_id = session?.user?._id;

  const [ isLiked, setIsLiked ] = useState(user_id ? likes.includes(user_id) : false);
  const [ likeCount, setLikeCount ] = useState(likes.length);

  const { setIsOpen, setMessage } = useModalContext();

  // styling for heart icon depending on isLiked state
  const weight = isLiked ? 'fill' : 'bold';
  const classes = isLiked ? 'text-red opacity-80' : 'opacity-40';

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

    if (session?.status==="authenticated") {
      toggleLike(review_id);
    } else {
      setIsOpen(true);
      setMessage('Join SoundCrate to like reviews');
    }

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
