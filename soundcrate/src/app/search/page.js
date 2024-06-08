'use client';

import { search_spotify } from '@/lib/spotify.js';
import {
  AlbumCard,
  FollowUserCard
} from '@/components';
import { useState, useEffect } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function SearchPage() {

  const [ query, setQuery ] = useState('');
  const [ searchResults, setSearchResults ] = useState(null);

  useEffect(() => {
    // set search results from session storage every time page mounts
    try {
      const search_results = window.sessionStorage.getItem('search-results');
      if (search_results && search_results != null) {
        setSearchResults(JSON.parse(search_results));
      }
    } catch { }
  }, []);

  useEffect(() => {
    // set search results to session storage whenever searchResults updates
    if (searchResults != null) {
      window.sessionStorage.setItem('search-results', JSON.stringify(searchResults));
    }
  }, [searchResults]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // perform spotify search using input query
    if (query && query != '') {
      const spotify_response = await search_spotify(query);
      setSearchResults(spotify_response);

      try {

        const params = { q: query };
        const query_string = new URLSearchParams(params).toString();

        const res = await fetch(
          `/api/user/searchByUsername?${query_string}`, 
          { method: 'GET' }
        );
    
        const responseData = await res.json();
        if (responseData?.body) {
          setSearchResults({...spotify_response, ...responseData.body});
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }

      window.sessionStorage.setItem('search-results', searchResults);
    }
  }

  const render_searchbar = () => { 
    return (
      <form className="flex flex-col gap-3" onSubmit={handleSubmit} autoComplete="off">
        <div className="w-full">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 pl-4 items-center pointer-events-none">
              <MagnifyingGlass size={18} weight="bold" />
            </div>
            <input
              type="search"
              id="searchbar"
              value={query}
              placeholder={"Search songs or albums..."}
              onChange={(e) => { setQuery(e.target.value) }}
              className="block p-4 pl-12 r-10 w-full text-xl font-semibold bg-dark-dark rounded-lg outline-none ring-none"
            />

            {/* <button type="submit" className="text-light absolute right-3.5 bottom-2.5 bg-accent hover:bg-blue font-medium rounded-lg text-sm px-4 py-2">Search</button> */}
            {/* <button className="text-light absolute right-3.5 bottom-2.5 hover:bg-blue font-medium rounded-lg text-sm px-4 py-2">X</button> */}

          </div>
        </div>
      </form>
    )
  }

  const render_song_cards = () => {
    const songs_array = searchResults?.tracks?.items
    if (songs_array) {
      return (songs_array).map((song) =>
        <AlbumCard 
          key={`song-card-${song.id}`} 
          username={""}
          album_id={song.id}
          name={song.name}
          artist_name={song.album.artists[0]?.name}
          size={20}
          album_art={song.album.images[1]?.url}
          href={'/song/'+song.id} />
      );
    }
    return null;
  }

  const render_album_cards = () => {
    const albums_array = (searchResults?.albums?.items)?.slice(0, 10)
    if (albums_array) {
      return (albums_array).map((album) =>
        <AlbumCard 
          key={`album-card-${album.id}`} 
          username={""}
          album_id={album.id}
          name={album.name}
          artist_name={album.artists[0]?.name}
          size={20}
          album_art={album.images[1]?.url} 
          href={'/album/'+album.id} />
      );
    }
    return null;
  }

  const render_user_cards = () => {
    const users_array = (searchResults?.users)?.slice(0, 5)
    if (users_array) {
      return (users_array).map((user) => 
        <FollowUserCard
          key={`follow-user-card-${user._id}`}
          href={`/user/${user.username}/profile`}
          username={user.username}
          user_id={user._id}
          profile_img={user.imageUrl}
          review_count={user.reviewCount} />
      );
    }
    return null;
  }


  return (
    <main className="flex flex-col gap-6 mb-12">
      <h1 className="sr-only">Search</h1>
      {render_searchbar()}

      <CardGridSection title={"Users"} styling="flex flex-col mt-1 gap-4">
        {render_user_cards()}
      </CardGridSection>

      <CardGridSection title={"Songs"} styling={"gap-x-4 gap-y-6 grid grid-cols-6"}>
        {render_song_cards()}
      </CardGridSection>

      <CardGridSection title={"Albums"} styling={"gap-x-4 gap-y-6 grid grid-cols-6"}>
        {render_album_cards()}
      </CardGridSection>

    </main>
  );
}

function CardGridSection({ title, children, styling }) {
  if (!children || children?.length == 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3 mb-6">
      <h2>{title}</h2>
      <div className={styling}>
        {children}
      </div>
    </section>
  )
}
  