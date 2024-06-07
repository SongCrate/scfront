'use client';

// import { get_db, get_user_id, get_list_length } from '/utils';
import { ListCard } from "@/components";
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
    return (list_array && list_array.map((lists) =>
      <ListCard 
        key={lists._id}
        username={username}
        list_id={lists._id}
        name={lists.title}
        song_count={lists.songIds.length} 
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