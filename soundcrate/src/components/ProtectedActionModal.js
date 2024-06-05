'use client';

import { X } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function ProtectedActionModal({ isOpen, setIsOpen, message }) {

  const { data: session } = useSession();

  const modal_id = "protected-modal-id";

  const handleClose = () => {
    setIsOpen(false);
  }

  return ( session?.status !== 'authenticated' && isOpen && // only display if user not logged in
    <>
    {/* <button type="button" className="hidden" data-hs-overlay={"#"+modal_id}></button> */}

    <div id={modal_id} className="h-screen flex items-center hs-overlay bg-dark-dark/80 size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
      {/* hs overlay */}
      <div className="opacity-100 transition-all y-auto sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        {/* modal box */}
        <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">
          
          {/* header and close button */}
          <div className="flex justify-between items-center py-3 px-4">
            <h3 className="font-bold"></h3>
            <button onClick={handleClose} type="button" id={modal_id} className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#"+modal_id}>
              <span className="sr-only">Close</span>
              <X size={18} />
            </button>
          </div>

          {/* modal body */}
          <div className="flex flex-col gap-3 pb-11 items-center">

            {/* message */}
            <p className="opacity-80 font-medium text-lg">
              {message}
            </p>

            {/* register and login buttons */}
            <span className="flex flex-row gap-2" onClick={handleClose}>
              <Link href="/register">
                <button className="btn hs-dropup-toggle gap-x-2 text-sm rounded-md bg-blue hover:bg-opacity-80 text-light disabled:opacity-50">Register</button>
              </Link>
              <Link href="/login">
                <button className="btn hs-dropup-toggle gap-x-2 text-sm rounded-md text-gray hover:bg-dark hover:bg-opacity-40">Login</button>
              </Link>
            </span>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
