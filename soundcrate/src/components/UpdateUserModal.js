'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { X } from "@phosphor-icons/react";

export default function UpdateUserModal({ modalId }) {

    const { data: session, update } = useSession();

    const username = session?.user?.username;
    const imageUrl = session?.user?.imageUrl ?? '';

    const modal_id = modalId ?? "update-user-modal";
    const [ newUsername, setNewUsername ] = useState(username);
    const [ newImageUrl, setNewImageUrl ] = useState(imageUrl);
    const [ previewImageUrl, setPreviewImageUrl ] = useState(imageUrl);
    const name_char_limit = 30;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('/api/user/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: session.user._id, // Assuming the user object has an 'id' field
                    username: newUsername,
                    imageUrl: newImageUrl,
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log("User updated successfully:", responseData);
                // Update session data if necessary
                update({
                    user: {
                        ...session.user,
                        username: newUsername,
                        imageUrl: newImageUrl,
                    },
                });
                window.location.reload();
            } else {
                console.error("Failed to update user:", responseData);
                // Handle error response
            }
        }catch (error){
            console.error("Error updating user:", error);
        }
        HSOverlay.close("#" + modal_id);


    }

    const handlePreview = (e) => {
        e.preventDefault();
        setPreviewImageUrl(newImageUrl);
    }

    const handleCancel = () => {
        setNewUsername(username);
        setNewImageUrl(imageUrl);
        setPreviewImageUrl(imageUrl);
    }

    const render_form = () => {
        return (
            <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>

                {/* username */}
                <div className="w-full">

                    <div className="flex justify-between items-center">
                        <label htmlFor="username-input" className="block text-sm font-medium mb-1 text-light">
                            Username
                        </label>
                        <span className={`block mb-2 text-sm opacity-60" ${name.length < name_char_limit - 10 ? 'invisible' : 'visible'}`}>
              {newUsername.trim().length} / {name_char_limit}
            </span>
                    </div>

                    <input
                        id="username-input"
                        maxLength={name_char_limit}
                        value={newUsername}
                        onChange={(e) => { setNewUsername(e.target.value) }}
                    />

                </div>

                {/* newImageUrl */}
                <div className="w-full">

                    <label htmlFor="image-url-input" className="block text-sm font-medium mb-1 text-light">
                        Image URL
                    </label>

                    <div className="flex flex-row">
                        <input
                            id="image-url-input"
                            className="py-2 px-3 block w-full bg-gray-dark rounded-md rounded-r-none text-sm focus:border-gray focus:ring-gray disabled:opacity-50 disabled:pointer-events-none"
                            value={newImageUrl}
                            onChange={(e) => { setNewImageUrl(e.target.value) }}
                        />
                        <button
                            onClick={handlePreview}
                            disabled={!newImageUrl.length}
                            className="btn gap-x-2 text-sm rounded-md rounded-l-none bg-gray bg-opacity-20 hover:bg-opacity-10 text-light disabled:opacity-50">
                            Preview
                        </button>
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
            <button type="button" className="hidden" data-hs-overlay={"#"+modal_id}>
                {/* <Playlist size={18} weight="fill" className="mr-2" /> Add to List */}
            </button>

            <div id={modal_id} className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
                {/* hs overlay */}
                <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    {/* modal box */}
                    <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">

                        {/* header and close button */}
                        <div className="flex justify-between items-center py-3 px-4">
                            <h3 className="font-bold">Update Profile</h3>
                            <button type="button" id="write-review-modal-close-btn" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#"+modal_id}>
                                <span className="sr-only">Close</span>
                                <X size={18} />
                            </button>
                        </div>

                        {/* modal body */}
                        <div className="flex flex-col px-4 pb-3 py-1 w-100">

                            <div className="flex flex-row gap-4">

                                {/* user image preview */}
                                <img
                                    src={previewImageUrl ?? "/images/default-user.png"}
                                    className="rounded-md mt-2 w-[100px] h-[100px] object-cover"
                                    onError={e => {
                                        e.currentTarget.src = "/images/default-user.png"
                                    }}
                                />

                                {/* form to enter new profile */}
                                {render_form()}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}