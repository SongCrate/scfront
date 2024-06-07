'use client';

import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';

export default function UpdateCredentialsModal({ modalId })  {
  const { data: session } = useSession();
  const modal_id = modalId ?? "update-credentials-modal";

  const [ email, setEmail ] = useState(session?.user?.email);
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, passwordConfirmation);
  }

  const handleCancel = () => {
    setEmail(session?.user?.email);
    setPassword('');
    setPasswordConfirmation('');
  }

  const render_form = () => {
    return (
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>

        {/* email */}
        <div className="w-full">

          <label htmlFor="email-input" className="block text-sm font-medium mb-1 text-light">
            Email
          </label>

          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />

        </div>

        {/* password */}
        <div className="w-full">

          <label htmlFor="password-input" className="block text-sm font-medium mb-1 text-light">
            Password
          </label>

          <div className="flex flex-row">
            <input
              id="password-input"
              type="password"
              className="py-2 px-3 block w-full bg-gray-dark rounded-md text-sm focus:border-gray focus:ring-gray disabled:opacity-50 disabled:pointer-events-none"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

        </div>

        {/* password confirmation */}
        <div className="w-full">

          <label htmlFor="password-conf-input" className="block text-sm font-medium mb-1 text-light">
            Confirm Password
          </label>

          <div className="flex flex-row">
            <input
              id="password-conf-input"
              type="password"
              className="py-2 px-3 block w-full bg-gray-dark rounded-md text-sm focus:border-gray focus:ring-gray disabled:opacity-50 disabled:pointer-events-none"
              value={passwordConfirmation}
              onChange={(e) => { setPasswordConfirmation(e.target.value) }}
            />
          </div>
          
        </div>

    {/* cancel and action buttons */}
    <div className="flex justify-end items-center gap-x-2 p-3">
      <button 
        type="button" 
        className="btn hs-dropup-toggle gap-x-2 text-sm font-medium rounded-md text-gray hover:bg-dark hover:bg-opacity-40" 
        data-hs-overlay={"#"+modal_id}
        onClick={handleCancel}>
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="btn gap-x-2 text-sm rounded-md bg-blue hover:bg-opacity-80 text-light disabled:opacity-50">
          Save
      </button>
    </div>

  </form>
  )}

  return (
    <>
      <button type="button" className="hover" data-hs-overlay={"#"+modal_id}>
      </button>

      <div id={modal_id} className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        {/* hs overlay */}
        <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          {/* modal box */}
          <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">
            
            {/* header and close button */}
            <div className="flex justify-between items-center py-3 px-4">
              <h3 className="font-bold">Settings</h3>
              <button type="button" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#"+modal_id}>
                <span className="sr-only">Close</span>
                <X size={18} />
              </button>
            </div>

            {/* modal body */}
            <div className="px-4 py-1">
              {render_form()}
            </div>

          </div>
        </div>
      </div>
    </>
  );

};