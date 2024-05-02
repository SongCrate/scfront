'use client';
import { useState } from 'react';
import { 
  Plus,
  X } from '@phosphor-icons/react';

export default function CreateListModal() {

  const modal_id = "create-modal-id";
  const [ description, setDescription ] = useState("");
  const description_char_limit = 150;

  const renderForm = () => {
    return (
      <form className="flex flex-col gap-3">

        {/* list name */}
        <div className="w-full">
          <label htmlFor="list-name-input" className="block text-sm font-medium mb-1 text-light">Name</label>
          <input type="email" id="list-name-input"/>
        </div>

        {/* list description */}
        <div className="w-full">
          <div className="flex justify-between items-center">
            <label htmlFor="list-desc-textarea" className="block text-sm font-medium mb-1 text-light">
              Description <span className="opacity-60">(Optional)</span>
            </label>
            <span className={`block mb-2 text-sm opacity-60" ${description.length < description_char_limit - 25 ? 'invisible' : 'visible'}`}>
              {description.length} / {description_char_limit}
            </span>
          </div>
          <textarea 
            id="list-desc-textarea" 
            className="py-2 px-3 block w-full bg-gray-dark rounded-md text-sm focus:border-gray focus:ring-gray disabled:opacity-50 disabled:pointer-events-none" 
            rows="3"
            maxLength={description_char_limit}
            value={description}
            onChange={(e) => { setDescription(e.target.value.trim()) }}
          >
          </textarea>
        </div>

      </form>
    )
  }

  return (
    <>
      <button type="button" className="btn p-2 bg-dark-100 text-white rounded-md hover:bg-blue" data-hs-overlay={"#"+modal_id}>
        <Plus weight="bold" className="mr-1" /> New
      </button>

      <div id={modal_id} className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        {/* hs overlay */}
        <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          {/* modal box */}
          <div className="bg-dark-100 flex flex-col shadow-sm rounded-lg pointer-events-auto">
            
            {/* header and close button */}
            <div className="flex justify-between items-center py-3 px-4">
              <h3 className="font-bold">Create New List</h3>
              <button type="button" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#"+modal_id}>
                <span className="sr-only">Close</span>
                <X size={18} />
              </button>
            </div>

            {/* modal body */}
            <div className="px-4 py-1">
              {renderForm()}
            </div>

            {/* cancel and action buttons */}
            <div className="flex justify-end items-center gap-x-2 p-3">
              <button type="button" className="btn hs-dropup-toggle gap-x-2 text-sm font-medium rounded-md text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#"+modal_id}>
                Cancel
              </button>
              <button type="button" className="btn gap-x-2 text-sm rounded-md bg-blue hover:bg-opacity-80 text-light disabled:opacity-50">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
