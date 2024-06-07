'use client';

import { ListCard, EmptyContentMessage } from "@/components";
import { useState, useEffect } from 'react';

export default function ListsPage({ params }) {
  const { username } = params;
  const [ lists, setLists ] = useState([]);
 
  // fetch all songlists for this username
  useEffect(() => {
    async function fetchSongLists(username) {
      try {
        const response = await fetch(
          `/api/lists/getSongLists?username=${username}`, 
          { method: 'GET' }
        );
        const responseData = await response.json();
        if (responseData?.body) {
          setLists(responseData.body);
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSongLists(username);
  }, [username]);

  const list_cards = (list_array) => {
    if (!list_array || list_array.length === 0) {
      return <EmptyContentMessage message="No Lists" />;
    }
    return (list_array && list_array.map((list) =>
      <ListCard 
        key={list._id}
        username={list.user.username}
        list_id={list._id}
        name={list.title}
        song_count={list.songIds.length} 
      />
    ))
  }
    
  return (
    <main className="flex flex-col gap-4">
      <h2>Lists</h2>
      <div className="flex flex-col gap-4">
        {list_cards(lists)}
      </div>
    </main>
  );
}