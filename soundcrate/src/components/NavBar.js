'use client';
import Link from 'next/link';
import {
    CaretDown,
    Gear,
    SignOut,
    User,
    Star,
    X,
    Trash
} from '@phosphor-icons/react';
import { signOut, useSession } from "next-auth/react";
import { UpdateUserModal, UpdateCredentialsModal } from '@/components';
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function NavBar({ modalId }) {
    const { data: session } = useSession();
    const update_user_modal_id = "update-user-modal";
    const update_credentials_modal_id = "update-credentials-modal";
    const router = useRouter();

    const [deletePassword, setDeletePassword] = useState("");
    const [error, setError] = useState("");
    const modal_id = modalId ?? "delete-user-modal";

    const handleDeleteSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/api/user/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: session.user._id, // Assuming the user object has an 'id' field
                    password: deletePassword,
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log("User deleted successfully:", responseData);
                // Sign out the user and navigate to the home page after sign-out
                signOut({ callbackUrl: "/" });


            } else {
                setError(responseData.error || "Failed to delete user");
                return;
                // Handle error response
            }
        }catch (error){
            console.error("Error deleting user:", error);
            setError("An unexpected error occurred.");
            return;
        }
        HSOverlay.close("#" + modal_id);
    }

    const handleDeleteCancel = () =>{
        setDeletePassword('');
        setDeleteError('');
    }

    const handleMyAccountNav = () => {
        router.push(`/user/${session?.user?.username}/profile`)
        HSOverlay.open("#"+update_user_modal_id);
    }

    const handleSettingsNav = () => {
        router.push(`/user/${session?.user?.username}/profile`)
        HSOverlay.open("#"+update_credentials_modal_id);
    }

      const renderPublicNav = () => {
        return (
          <>
            <button type="button" className="btn text-white">
              <Link href="/search">Search</Link>
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

        <UpdateUserModal modalId={update_user_modal_id}/>
        <UpdateCredentialsModal modalId={update_credentials_modal_id}/>

        <button type="button" className="btn">
          <Link href="/feed">My Feed</Link>
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
                <Star size={18} weight="bold" />
                Profile
              </Link>
              <div onClick={handleMyAccountNav} className={menu_nav_link_styling + " hover:cursor-pointer"} >
                <User size={18} weight="bold" />
                My Account
              </div>
              <div onClick={handleSettingsNav} className={menu_nav_link_styling + " hover:cursor-pointer"} >
                <Gear size={18} weight="bold" />
                Settings
              </div>
              <hr className="border-dark-light my-1"></hr>
              <Link href="/" className={menu_nav_link_styling} onClick={signOut}>
                <SignOut size={18} weight="bold" />
                  Logout
              </Link>
                <div type={"button"} className={menu_nav_link_styling + "focus:bg-red hover:bg-red text-light cursor-pointer"} data-hs-overlay="#delete-modal">
                <Trash size={18} weight="bold" />
                Delete
                </div>
            </div>
          </div>
        </div>
      </>
    )
  }

    const render_delete_form = () => {
        return (
            <form className="flex flex-col gap-3 w-full" onSubmit={handleDeleteSubmit}>
                {/* password */}
                <div className="w-full">

                    <label htmlFor="delete-password-input" className="block text-md font-normal mb-5 text-light">
                        Confirm password to delete
                    </label>

                    <div className="flex flex-row">
                        <input
                            id="delete-password-input"
                            type="password"
                            className="py-2 px-3 block w-full bg-gray-dark rounded-md text-sm focus:border-gray focus:ring-gray disabled:opacity-50 disabled:pointer-events-none"
                            value={deletePassword}
                            onChange={(e) => { setDeletePassword(e.target.value) }}
                        />
                    </div>

                </div>
                { setError && (
                    <div className={"text-red pt-3 mb-0"} style={{ whiteSpace: 'pre-line'}}>
                        {error}
                    </div>)
                }

                {/* cancel and delete buttons */}
                <div className="flex justify-end items-center gap-x-2 p-3">
                    <button
                        type="button"
                        className="btn hs-dropup-toggle gap-x-2 text-sm font-medium rounded-md text-gray hover:bg-dark hover:bg-opacity-40"
                        data-hs-overlay={"#delete-modal"}
                        onClick={handleDeleteCancel}>
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteSubmit}
                        className="btn gap-x-2 text-sm rounded-md bg-red hover:bg-opacity-80 text-light disabled:opacity-50">
                        Delete
                    </button>
                </div>
            </form>
        );
    };

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
        <div id="delete-modal" className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
            {/* hs overlay */}
            <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                {/* modal box */}
                <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">

                    {/* header and close button */}
                    <div className="flex justify-between items-center py-3 px-4">
                        <h3 className="font-bold">Confirm Deletion</h3>
                        <button type="button" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay="#delete-modal">
                            <span className="sr-only">Close</span>
                            <X size={18} />
                        </button>
                    </div>

                    {/* modal body */}
                    <div className="px-4 py-1">
                        {render_delete_form()}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}