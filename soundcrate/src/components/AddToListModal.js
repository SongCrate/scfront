'use client';

import { ListCard } from '@/components';
import { Playlist, Plus, X, Check } from '@phosphor-icons/react';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';

export default function AddToListModal({
  song_id,
  album_id,
  song_name,
  artist,
  album_name,
  album_art,
  year,
  onListUpdate
}) {

  const { data: session } = useSession();
  const [listData, setListData] = useState([]);

  const modal_id = "add-to-list-modal-id";

  useEffect(() => {
    async function fetchUserLists() {
      try {
        const response = await fetch(`/api/lists/getListsForModal`);
        const data = await response.json();
        if (response.ok) {
          setListData(data.body);
        } else {
          console.log("Message: " + data.error);
        }
      } catch (error) {
        console.log("Message2: " + error);
      }
    }
    
    fetchUserLists();
  }, [session]);

  const handleAction = async (listId, action) => {
    try {
      const response = await fetch(`/api/lists/updateSongList`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ listId, songId: song_id, action }),
      });
      
      const responseData = await response.json();
      if (response.ok) {
        setListData(prevData => prevData.map(list => 
          list._id === responseData.body._id ? responseData.body : list
        ));
        onListUpdate(responseData.body);
      } else {
        console.log("Message3: " + responseData.error);
      }
    } catch (error) {
      console.log("Message4: " + error);
    }
  };

  const render_header = () => {
    return (
      <section className="flex flex-row gap-4 items-end">
        {/* album art */}
        <img
          src={album_art ?? "/images/default-user.png"}
          alt={`${song_name} by ${artist}`}
          className="rounded-md w-[60px] h-[60px]"
          onError={e => {
            e.currentTarget.src = "/images/default-user.png"
          }}
        />
        {/* song details */}
        <div className="flex flex-col">
          <h1>{song_name}</h1>
          <p className="text-med opacity-70 text-sm">
            <span>{artist}</span>
            <span className="mx-1">∙</span>
            <span>{album_name} ({year})</span>
          </p>
        </div>
      </section>
    )
  }

  const render_list_cards = () => {
    return (
      listData?.map((list) => 
        <div key={`list-card-${list._id}`} className="flex flex-row justify-between items-center">
          <ListCard
            username={session?.user?.name}
            list_id={list._id}
            name={list.title}
            song_count={list.songIds.length}
            is_link={false}
            show_add_btn={true} />
          <button
            onClick={() => handleAction(list._id, list.songIds.includes(song_id) ? 'remove' : 'add')}
            className="btn-round text-gray hover:bg-dark hover:bg-opacity-40 p-2"
          >
            {list.songIds.includes(song_id) ? <Check size={18} /> : <Plus size={18} />}
          </button>
          <hr className="opacity-10"></hr>
        </div>
      )
    )
  }

  return (
    <>
      <button type="button" className="btn bg-dark-dark text-white text-lg font-semibold rounded-md hover:bg-opacity-60 p-3 w-full" data-hs-overlay={"#"+modal_id}>
        <Playlist size={18} weight="fill" className="mr-2" /> Add to List
      </button>

      <div id={modal_id} className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        {/* hs overlay */}
        <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          {/* modal box */}
          <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">
            
            {/* header and close button */}
            <div className="flex justify-between items-center py-3 px-4">
              <h3 className="font-bold">Add To List</h3>
              <button type="button" id="write-review-modal-close-btn" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#"+modal_id}>
                <span className="sr-only">Close</span>
                <X size={18} />
              </button>
            </div>

            {/* modal body */}
            <div className="flex flex-col px-4 py-1">
              {render_header()}
              <hr className="opacity-10 mt-3" />
              <div className="flex flex-col pb-3">
                {render_list_cards()}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );


}
