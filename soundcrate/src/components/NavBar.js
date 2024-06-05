'use client';
import Link from 'next/link';
import {
    CaretDown,
    Gear, MagnifyingGlass,
    SignOut,
    User
} from '@phosphor-icons/react';
import {useEffect, useState} from "react";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session } = useSession();

  const renderPublicNav = () => {
    return (
      <>
        <button type="button" className="btn text-white">
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
              {session?.user?.imageUrl ?
                  <img className="inline-block size-8 rounded-full" src={session?.user?.imageUrl} /> :
                  <img className="inline-block size-8 rounded-full" src={"/images/default-user.png"} />
              }

            <CaretDown size={18} weight="bold" />
          </button>

          <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-dark-dark rounded-lg p-2 mt-2" aria-labelledby="hs-dropdown-with-header">
            
            {/* username header */}
            <div className="py-3 px-5 -m-2 bg-dark-light rounded-t-lg">
              <p className="text-sm text-gray">Signed in as</p>
              <p className="font-medium text-gray-light">{session?.user?.username}</p>
            </div>

            {/* nav links */}
            <div className="mt-2 py-2 first:pt-0 last:pb-0">
              <Link href={`/user/${session?.user?.username}/profile`} className={menu_nav_link_styling}>
                <User size={18} weight="bold" />
                Profile
              </Link>
              <Link href={`/user/${session?.user?.username}/profile?modal=setings`} className={menu_nav_link_styling}>
                <Gear size={18} weight="bold" />
                Settings
              </Link>
              <hr className="border-dark-light my-1"></hr>
              <Link href="/" className={menu_nav_link_styling} onClick={signOut}>
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
        <h2 className="text-3xl font-bold truncate text-white">
          <Link href="/">SoundCrate</Link>
        </h2>

        {/* navigation */}
        <div className="flex gap-2">
            {session?.status==="authenticated"
              ? renderUserNav() 
              : renderPublicNav()
            }
        </div>

      </div>
    </div>
  );
}