'use client';
import Link from 'next/link';
import {
    CaretDown,
    Gear, MagnifyingGlass,
    SignOut,
    User
} from '@phosphor-icons/react';
import {useEffect, useState} from "react";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [profileImg, setProfileImg] = useState('/images/janedoe-user.jpg');

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        // const storedIsLoggedIn = sessionStorage.getItem('is_logged_in');
        console.log(storedUsername)
        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            // setProfileImg(`/images/${storedUsername}-user.jpg`);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("username");
        window.location.reload();
    }
  const renderPublicNav = () => {
    return (
      <>
        <button type="button" className="btn">
          <Link href="/search">Explore</Link>
        </button>
        <button type="button" className="btn">
          <Link href="/register">Register</Link>
        </button>
        <button type="button" className="btn">
          <Link href="/login">Login</Link>
        </button>
      </>
    )
  }

  const renderUserNav = () => {

    const menu_nav_link_styling = "flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-dark-light hover:bg-opacity-40 focus:outline-none focus:bg-dark-light";

    return (
      <>
        <button type="button" className="btn">
          <Link href="/search">Explore</Link>
        </button>
        <button type="button" className="btn">
          <Link href="/search">Search</Link>
        </button>

        <div className="hs-dropdown relative inline-flex [--placement:bottom-right] z-[80]">
          <button id="hs-dropdown-with-header" type="button" className="hs-dropdown-toggle inline-flex items-center gap-x-2 text-sm font-medium">
            <img className="inline-block size-8 rounded-full" src={profileImg} />
            <CaretDown size={18} weight="bold" />
          </button>

          <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-dark-dark rounded-lg p-2 mt-2" aria-labelledby="hs-dropdown-with-header">
            
            {/* username header */}
            <div className="py-3 px-5 -m-2 bg-dark-light rounded-t-lg">
              <p className="text-sm text-gray">Signed in as</p>
              <p className="font-medium text-gray-light">{username}</p>
            </div>

            {/* nav links */}
            <div className="mt-2 py-2 first:pt-0 last:pb-0">
              <Link href={`/user/${username}/profile`} className={menu_nav_link_styling}>
                <User size={18} weight="bold" />
                Profile
              </Link>
              <Link href="#" className={menu_nav_link_styling}>
                <Gear size={18} weight="bold" />
                Settings
              </Link>
              <hr className="border-dark-light my-1"></hr>
              <Link href="/" className={menu_nav_link_styling} onClick={handleLogout}>
                <SignOut size={18} weight="bold" />Logout
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="bg-gradient-to-b from-[#0a1017] pt-8 pb-10">
      <div className="main-container flex justify-between items-center">

        {/* site title */}
        <h2 className="text-3xl font-bold truncate">
          <Link href="/">SoundCrate</Link>
        </h2>

        {/* navigation */}
        <div className="flex gap-2">
            {isLoggedIn
              ? renderUserNav() 
              : renderPublicNav()
            }
        </div>

      </div>
    </div>
  );
}