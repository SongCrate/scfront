import { get_db, get_user_id, get_list_length } from '/utils';
import {
    ListCard
  } from "@/components";

export default function ListsPage({ params }) {
  const { username } = params;
  const user_id = get_user_id(username);

  const db = get_db();

  var list_data = db['list'].filter(record => {
    return record.user_id = user_id;
  })

  var list_data = list_data.map((_, i) => (
    {...list_data[i],
      "song_count": get_list_length(list_data[i].id)
    } 
  ))

  const list_cards = list_data.map((list, i) => 
  <div key={`list-card-${i}`}>
    <ListCard 
      username={username}
      name={list.name}
      song_count={list.song_count} />
    <hr className="opacity-30"></hr>
  </div >
  )
    
  return (
    <>
      <h1>{username}'s lists</h1>
      <main>
        {list_cards}
      </main>
    </>
  );
}