'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { X } from "@phosphor-icons/react";

export default function UpdateUserDataModal({ onClose, modalId }) {
  const { data: session, update } = useSession();
  const modal_id = modalId ?? "update-user-modal";

  const username = session?.user?.username;
  const imageUrl = session?.user?.imageUrl ?? '';

  const [newUsername, setNewUsername] = useState(username);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [previewImageUrl, setPreviewImageUrl] = useState(imageUrl);
  const name_char_limit = 30;

  const handleSubmit = async (e) => {
    e.preventDefault();

    async function updateProfile(profile_details) {
      try {
        const response = await fetch('/api/user/update_user', {
          method: 'PUT',
          body: JSON.stringify(profile_details)
        });

        const response_data = await response.json();
        if (response_data?.status == 200) {

          console.log("updating")
          // update session
          update({user: {
              ...session.user, 
              username: profile_details.username, 
              imageUrl: profile_details.imageUrl 
            }
          }) 

          // reload entire page if username was changed so that all links are correct
          if (profile_details.username != username) {
            window.location.reload();
          }

        } else if (response_data?.status == 401) {
          // display unauthorized modal
          HSOverlay.close("#"+modal_id);
          setMessage('Unauthorized');
          setIsOpen(true);
        } else {
          console.log(response_data)
        }

      } catch (error) {
        console.log(error);
      }
    }

    // create body to send to api
    const profile_details = {
      username: newUsername.trim(),
      imageUrl: newImageUrl.trim(),
    }

    if (profile_details.username != username || profile_details.imageUrl != imageUrl) {
      // send profile details to api
      updateProfile(profile_details);
    } else {
      // clear modal inputs
      setNewUsername(username);
      setNewImageUrl(imageUrl);
    }

    // close the modal
    HSOverlay.close("#"+modal_id);
  }

  const handleCancel = () => {
    setNewUsername(username);
    setNewImageUrl(imageUrl);
    setPreviewImageUrl(imageUrl);
    onClose();
  }

    const handlePreview = (e) => {
    e.preventDefault();
    setPreviewImageUrl(newImageUrl);
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
            <span className={`block mb-2 text-sm opacity-60 ${newUsername.length < name_char_limit - 10 ? 'invisible' : 'visible'}`}>
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
    )
  }

  return (
    <div className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 fixed inset-0 z-[80] flex items-center justify-center">
      <div className="bg-dark-light flex flex-col shadow-sm rounded-lg w-full max-w-md">
        {/* header and close button */}
        <div className="flex justify-between items-center py-3 px-4">
          <h3 className="font-bold">Update Profile</h3>
          <button type="button" className="btn-round flex text-gray hover:bg-dark hover:bg-opacity-40" onClick={onClose}>
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
                e.currentTarget.src = "/images/default-user.png";
              }}
            />
            {/* form to enter new profile */}
            {render_form()}
          </div>
        </div>
      </div>
    </div>
  );
}

//     async function updateProfile(profile_details) {
//       try {
//         const response = await fetch('/api/user/updateUser', {
//           method: 'PUT',
//           body: JSON.stringify(profile_details)
//         });

//         const response_data = await response.json();
//         if (response_data?.status == 200) {

//           // update session
//           update({user: {
//               ...session.user, 
//               username: profile_details.username, 
//               imageUrl: profile_details.imageUrl 
//             }
//           }); 

//           // reload entire page if username was changed so that all links are correct
//           if (profile_details.username != username) {
//             window.location.reload();
//           }

//         } else if (response_data?.status == 401) {
//           // display unauthorized modal
//           onClose();
//           // Set message and display an unauthorized message (not implemented here)
//         } else {
//           console.log(response_data);
//         }

//       } catch (error) {
//         console.log(error);
//       }
//     }

    // // create body to send to api
    // const profile_details = {
    //   username: newUsername.trim(),
    //   imageUrl: newImageUrl.trim(),
    // }

    // if (profile_details.username != username || profile_details.imageUrl != imageUrl) {
    //   // send profile details to api
    //   updateProfile(profile_details);
    // } else {
    //   // clear modal inputs
    //   setNewUsername(username);
    //   setNewImageUrl(imageUrl);
    // }

//     // close the modal
//     onClose();
//   }

//   const handlePreview = (e) => {
//     e.preventDefault();
//     setPreviewImageUrl(newImageUrl);
//   }