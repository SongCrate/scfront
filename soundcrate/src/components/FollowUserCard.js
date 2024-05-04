'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FollowBtn } from '@/components';

export default function FollowUserCard({ user_data }) {
  const { username, profile_img, review_count, album_count } = user_data;
  const profile_url = `/user/${username}/profile`

  return (
    <div>
        <div className="max-h-fit flex flex-row justify-between items-center">
          
          {/* 1 - profile img, username, watch details */}
          <div className="flex items-start gap-3">


            {/* 1.2 - profile img */}
            
            <Image
              src={profile_img ?? "/images/default-user.png"} 
              alt={username}
              width={45}
              height={45}
              className="rounded-md"
            />

            <div className="flex flex-col">
            
              {/* username */}
              <Link href={profile_url}>
                <h4>{username}</h4>
              </Link>

              {/* review_count and album_count */}
              <div className="flex gap-2 opacity-60 uppercase text-xs">
                <Link href={profile_url+"/reviews"}>{review_count} Reviews</Link> 
                <Link href={profile_url+"/albums"}>{album_count} Albums</Link>
              </div>
            </div>

          </div>

          <FollowBtn username={username} />
          
        </div>
    </div>
  );
}
