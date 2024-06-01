'use client';

import { get_db, get_list_length } from '/utils';
import { ListCard } from '@/components';
import { 
  Playlist,
  Plus,
  X 
} from '@phosphor-icons/react';

export default function AddToListModal({
  song_id,
  album_id,
  song_name,
  artist,
  album_name,
  album_art,
  year
}) {

  // mock data, would be grabbing this from header
  const user_id = 1;
  const username = 'janedoe';

  const db = get_db();
  const modal_id = "add-to-list-modal-id";

  var list_data = db['list'].filter(record => {
    return record.user_id = user_id;
  })

  var list_data = list_data.map((_, i) => (
    {...list_data[i],
      "song_count": get_list_length(list_data[i].id)
    } 
  ))

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
      list_data.map((list) => 
        <div key={`list-card-${list.id}`} className="flex flex-row justify-between">
          <ListCard
            username={username}
            list_id={list.id}
            name={list.name}
            song_count={list.song_count} 
            is_link={false}
            show_add_btn={true} />
          <hr className="opacity-10"></hr>
        </div >
  ))}

  return (
    <>
      <button type="button" className="btn bg-dark-dark text-white text-lg font-sembold rounded-md hover:bg-opacity-60 p-3 w-full" data-hs-overlay={"#"+modal_id}>
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
