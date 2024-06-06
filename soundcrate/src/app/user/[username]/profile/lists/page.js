'use client';

// import { get_db, get_user_id, get_list_length } from '/utils';
import { ListCard } from "@/components";
import { useState, useEffect } from 'react';

export default function ListsPage({ params }) {
  const { username } = params;
  const [ lists, setLists ] = useState([]);
  // const { username } = params;
  // const user_id = get_user_id(username);

  // const db = get_db();

  // var list_data = db['list'].filter(record => {
  //   return record.user_id = user_id;
  // })

  // var list_data = list_data.map((_, i) => (
  //   {...list_data[i],
  //     "song_count": get_list_length(list_data[i].id)
  //   } 
  // ))

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

  // const list_cards = list_data.map((list, i) => 
  // <div key={`list-card-${list.id}`}>
  //   <ListCard 
  //     username={username}
  //     list_id={list.id}
  //     name={list.name}
  //     song_count={list.song_count} />
  //   <hr className="opacity-30"></hr>
  // </div >
  // )

  const list_cards = (list_array) => {
    return (list_array && list_array.map((lists) =>
          <ListCard 
            username={username}
            list_id={lists._id}
            name={lists.title}
            song_count={lists.song_count} />
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