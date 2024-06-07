'use client';

import { ListCard, EmptyContentMessage, CreateListModal } from "@/components";
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function ListsPage({ params }) {
  const { username } = params;
  const [ lists, setLists ] = useState([]);
  const { data: session } = useSession();
 
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

  // auto updates
  const handleNewList = (newList) => {
    setLists([newList, ...lists]);
  };

  // deleting a list
  const handleDeleteList = async (list_id) => {
    try {
      const response = await fetch(`/api/lists/deleteSongList?id=${list_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLists(lists.filter(list => list._id !== list_id));
      } else {
        const responseData = await response.json();
        console.error(responseData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const list_cards = (list_array) => {
    if (!list_array || list_array.length === 0) {
      return <EmptyContentMessage message="No Lists" />;
    }
    return (list_array && list_array.map((list) =>
      <div key={list._id} className="flex items-center justify-between bg-dark-light p-4 rounded-md mb-4">
        
        <div className="flex-grow">
          <ListCard 
            username={list.user.username}
            list_id={list._id}
            name={list.title}
            song_count={list.songIds.length} 
          />
        </div>
        {session?.status === 'authenticated' && session?.user?.username === username && (
          <button
            className="btn p-2 bg-dark-light text-white rounded-md hover:bg-red"
            onClick={() => handleDeleteList(list._id)}
          >
            Delete
          </button>
        )}
      </div>
    ))
  }
    
  return (
    <main className="flex flex-col gap-4">
      <h2>Lists</h2>
      {session?.status === "authenticated" && session?.user?.username === username && (
          <CreateListModal username={username} onCreate={handleNewList} />
        )}
      <div className="flex flex-col gap-4">
        {list_cards(lists)}
      </div>
    </main>
  );
}