'use client';

import Link from 'next/link';
import { FollowBtn } from '@/components';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function UserProfileLayout({ children, params }) {
  const { username } = params;
  const { data: session } = useSession();

  const [ user, setUser ] = useState({});
  const user_id = session?.user?._id;

  useEffect(() => {

    // fetch user data
    async function fetchUser() {
      try {
        const response = await fetch(`/api/user/getUser/${username}`, {
          method: 'GET',
        });
    
        const responseData = await response.json();
        if (responseData?.body) {
          setUser(responseData.body);
        }
    
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchUser();
  }, []);

  // user data packaged up in one place
  const userData = {
    id: user?.user?._id,
    profile_img: user?.user?.imageUrl,
    review_count: user?.reviewCount,
    album_count: user?.albumCount,
    list_count: user?.listCount,
    follower_count: user?.user?.followers?.length,
    following_count: user?.user?.following?.length
  }

  return (
    <div className="flex flex-col gap-6">
      {/* profile details */}
      <section className="flex flex-end gap-5 items-end">

        {/* user profile picture */}
        <img
          src={userData.profile_img ?? "/images/default-user.png"} 
          alt={username}
          className="rounded-md object-cover w-[70px] h-[70px]"
        />

        <div className="flex flex-col gap-1">

          <div className="flex flex-row gap-3 items-center">
            <Link href={`/user/${username}/profile`}>
              <h1 className="leading-none">{username}</h1>
            </Link>
            {session?.status == "authenticated" && user?.user &&
              <FollowBtn 
                userId={user.user._id} 
                user_is_following={user_id ? user.user.followers?.includes(user_id) : false}
                compact={true} 
              />
            }
          </div>

          {/* stats container: reviews, albums, followers, following */}
          <div className="flex flex-nowrap gap-2 items-end">
            <UserProfileStatistic
              number={userData.review_count}
              label={"Reviews"}
              href={`/user/${username}/profile/reviews`}
            />
            <UserProfileStatistic
              number={userData.album_count}
              label={"Albums"}
              href={`/user/${username}/profile/albums`}
            />
            <UserProfileStatistic
              number={userData.list_count}
              label={"Lists"}
              href={`/user/${username}/profile/lists`}
            />
            <UserProfileStatistic
              number={userData.follower_count}
              label={"Followers"}
              href={`/user/${username}/profile/followers`}
            />
            <UserProfileStatistic
              number={userData.following_count}
              label={"Following"}
              href={`/user/${username}/profile/following`}
            />
          </div>

        </div> 
      </section>
      {children}
    </div>
  );
}

function UserProfileStatistic({ number, label, href="" }) {
  return (
    <Link href={href}>
      <span className="flex items-baseline gap-1.5 px-0.5">
        <span className="font-semibold">{number}</span>
        <span className="uppercase text-sm opacity-60 tracking-wider">{label}</span>
      </span>
    </Link>
  );
}