'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useSession} from "next-auth/react";

export default function UserProfileLayout({ children, params }) {
  const { username } = params;
  const { data: session } = useSession();
  const [ user, setUser ] = useState({});

  // useEffect(()=>{
  //   if (username === session?.user?.username){
  //     user?.user?.imageUrl = session?.user?.imageUrl;
  //   }
  // },[session, user]);

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
        {
            username === session?.user?.username ?
                <img
                  src={session?.user?.imageUrl || "/images/default-user.png"}
                  alt={username}
                  className="rounded-md object-cover w-[70px] h-[70px]"
                />
                :
                <img
                  src={user?.user?.imageUrl || "/images/default-user.png"}
                  alt={username}
                  className="rounded-md object-cover w-[70px] h-[70px]"
                />
        }
        {/*<img*/}
        {/*  src={user?.user?.imageUrl || "/images/default-user.png"}*/}
        {/*  alt={username}*/}
        {/*  className="rounded-md object-cover w-[70px] h-[70px]"*/}
        {/*/>*/}

        <div className="flex flex-col gap-1">
          <Link href={`/user/${username}/profile`}>
            <h1>{username}</h1>
          </Link>
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