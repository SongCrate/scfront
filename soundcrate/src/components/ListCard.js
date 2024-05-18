'use client';

import Link from 'next/link';
import { AddToListButton } from '@/components';
import { Plus, Check } from '@phosphor-icons/react';
import { useState } from 'react';

export default function ListCard({ 
  username,
  list_id,
  name="List Name",
  song_count=0,
  show_username=false,
  is_link=true
 }) {

  const [ isAdded, setIsAdded ] = useState(false);

  const handleClick = (e) => {
    setIsAdded(!isAdded);
    e.stopPropagation();
    e.preventDefault();
  }


  return (
    <Link href={is_link ? `/user/${username}/list/${list_id}` : ''} className="w-full flex flex-row justify-between items-center">
      
      {/* 1 - list details */}
      <div className="max-h-fit py-3 flex flex-col gap-1">
        
        {/* 1.1 list name */}
        <h4>
          {name}
        </h4>

        {/* 1.2 song count */}
        <p className="text-sm uppercase opacity-70">
          <span>
            {song_count} {song_count == 1 ? "song" : "songs"}
          </span>
          {show_username &&
            <span className="ml-1">
              ∙ by {username}
            </span>
          }
        </p>
      
      </div>
      
      {/* 1 - add to song button */}
      <div className="flex flex-col items-center gap-1">
        <button className="flex flex-col items-center gap-1 z-99 padding-3" onClick={handleClick}>
          {isAdded 
            ? <Check weight={'bold'} size={18}/>
            : <Plus weight={'bold'} size={18}/>
          }
        </button>
      </div>
        
    </Link>
  );
}
