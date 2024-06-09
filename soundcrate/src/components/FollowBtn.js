'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useModalContext } from '@/app/ModalContextProvider/ModalContextProvider';
import { useRouter } from 'next/navigation';

export default function FollowBtn({ userId, user_is_following, compact=false }) {

  const { data: session } = useSession();
  const user_id = session?.user?._id;
  const target_user_id = userId;

  const [ isFollowing, setIsFollowing ] = useState(user_is_following)
  const { setIsOpen, setMessage } = useModalContext();
  const router = useRouter();

  const handleClick = () => {

    async function toggleFollowing() {
      try {
        const req_body = { action: user_is_following ? 'unfollow' : 'follow' }

        const response = await fetch(
          `/api/user/followUser/${target_user_id}`, 
          { method: 'POST',
            body: JSON.stringify(req_body)
          }
        );
    
        const responseData = await response.json();
        if (responseData?.body) {
          setIsFollowing(responseData.body?.is_following);
          // window.location.reload();
        } else if (responseData.status == 401) {
          // open modal is response is unauthorized
          setMessage('Join SoundCrate to follow users');
          setIsOpen(true);
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (session?.status != "authenticated") {
      setMessage('Join SoundCrate to follow users')
      setIsOpen(true);
    } else {
      toggleFollowing();
    }
  }

  return ( user_id != target_user_id &&
    (compact
      ? <button onClick={handleClick} className={`btn px-[6px] py-0.5 text-sm rounded-sm w-min font-medium ${isFollowing ? "bg-dark-light opacity-40 hover:bg-gray-dark hover:opacity-60" : "bg-blue bg-opacity-90"} hover:bg-opacity-70`}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>

      : <button onClick={handleClick} className={`btn ${isFollowing ? "opacity-80" : "bg-blue"}`}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    )
  );
}
