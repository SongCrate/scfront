// 'use client';

// import { useModalContext } from '@/app/ModalContextProvider/ModalContextProvider';
// import { useState, useEffect } from 'react';
// import { PencilSimple, X } from '@phosphor-icons/react';
// import { useSession } from "next-auth/react";

// export default function EditListModal({ username, list_id, onSave }) {
//   const { data: session } = useSession();
//   const { setIsOpen, setMessage } = useModalContext();

//   const modal_id = "edit-modal-id";
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const description_char_limit = 150;
//   const title_char_limit = 30;

//   useEffect(() => {
//     async function fetchListDetails() {
//       try {
//         const response = await fetch(`/api/lists/getOneSongList?id=${list_id}`);
//         const data = await response.json();
//         if (response.ok) {
//           setTitle(data.list.title);
//           setDescription(data.list.description || "");
//         } else {
//           console.error(data.error);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     if (session?.status === 'authenticated') {
//       fetchListDetails();
//     }
//   }, [list_id, session]);

//   const handleClick = (e) => {
//     if (session?.status !== 'authenticated') {
//       setMessage('Join SoundCrate to edit song lists');
//       setIsOpen(true);
//       HSOverlay?.close("#" + modal_id);

//       e.preventDefault();
//       e.stopPropagation();
//     }
//   }

//   const handleCancel = () => {
//     HSOverlay?.close("#" + modal_id);
//   }

//   const handleSubmit = async (e) => {
//     async function updateList(updated_list) {
//       try {
//         const response = await fetch('/api/lists/editSongList', {
//           method: 'PATCH',
//           body: JSON.stringify(updated_list)
//         });
        
//         const response_data = await response.json();
//         if (response_data?.status === 200) {
//           onSave(response_data.body);
//         } else {
//           console.log(response_data.error);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     e.preventDefault();

//     // if (!session || !session.user) {
//     //   console.log("User not authenticated");
//     //   return;
//     // }

//     const updated_list = {
//       title: title,
//       description: description,
//     }

//     updateList(updated_list);
//     handleCancel();
//   }

//   const renderForm = () => {
//     return (
//       <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

//         <div className="w-full">
//           <div className="flex justify-between items-center">
//             <label htmlFor="list-name-input" className="block text-sm font-medium mb-1 text-light">
//                 Name
//             </label>
//             <span className={`block mb-2 text-sm opacity-60 ${title.length < title_char_limit - 10 ? 'invisible' : 'visible'}`}>
//               {title.length} / {title_char_limit}
//             </span>
//           </div>

//           <input 
//             id="list-name-input"
//             maxLength={title_char_limit}
//             value={title}
//             onChange={(e) => { setTitle(e.target.value) }}
//           />
//         </div>

//         <div className="w-full">
//           <div className="flex justify-between items-center">
//             <label htmlFor="list-desc-textarea" className="block text-sm font-medium mb-1 text-light">
//               Description <span className="opacity-60">(Optional)</span>
//             </label>
//             <span className={`block mb-2 text-sm opacity-60 ${description.length < description_char_limit - 25 ? 'invisible' : 'visible'}`}>
//               {description.length} / {description_char_limit}
//             </span>
//           </div>
//           <textarea 
//             id="list-desc-textarea" 
//             className="py-2 px-3 block w-full bg-gray-dark rounded-md text-sm focus:border-gray focus:ring-gray disabled:opacity-50 disabled:pointer-events-none" 
//             rows="3"
//             maxLength={description_char_limit}
//             value={description}
//             onChange={(e) => { setDescription(e.target.value) }}
//           >
//           </textarea>
//         </div>

//         <div className="flex justify-end items-center gap-x-2 p-3">
//           <button 
//             type="button" 
//             onClick={handleCancel}
//             className="btn hs-dropup-toggle gap-x-2 text-sm font-medium rounded-md text-gray hover:bg-dark hover:bg-opacity-40" 
//             data-hs-overlay={"#" + modal_id}>
//             Cancel
//           </button>
//           <button 
//             disabled={!title}
//             onClick={handleSubmit} 
//             className="btn gap-x-2 text-sm rounded-md bg-blue hover:bg-opacity-80 text-light disabled:opacity-50"
//           >
//             Save
//           </button>
//         </div>

//       </form>
//     )
//   }

//   return (
//     session?.status === "authenticated" && session?.user?.username === username &&
//     <>
//       <button onClick={handleClick} type="button" className="btn p-2 bg-dark-light text-white rounded-md hover:bg-blue" data-hs-overlay={"#" + modal_id}>
//         <PencilSimple weight="bold" className="mr-1" /> Edit List Details
//       </button>

//       <div id={modal_id} className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
//         <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
//           <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">
            
//             <div className="flex justify-between items-center py-3 px-4">
//               <h3 className="font-bold">Edit List</h3>
//               <button type="button" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#" + modal_id}>
//                 <span className="sr-only">Close</span>
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="px-4 py-1">
//               {renderForm()}
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



'use client';

import { useModalContext } from '@/app/ModalContextProvider/ModalContextProvider';
import { useState, useEffect } from 'react';
import { PencilSimple, X } from '@phosphor-icons/react';
import { useSession } from "next-auth/react";

export default function EditListModal({ username, list_id, initialTitle, initialDescription, onSave }) {
  const { data: session } = useSession();
  const { setIsOpen, setMessage } = useModalContext();

  const modal_id = "edit-modal-id";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const description_char_limit = 150;
  const title_char_limit = 30;

  useEffect(() => {
    async function fetchListDetails() {
      try {
        const response = await fetch(`/api/lists/getOneSongList?id=${list_id}`);
        const data = await response.json();
        if (response.ok) {
          setTitle(data.list.title);
          setDescription(data.list.description || "");
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (session?.status === 'authenticated') {
      fetchListDetails();
    }
  }, [list_id, session]);

  const handleClick = (e) => {
    if (session?.status !== 'authenticated') {
      setMessage('Join SoundCrate to edit song lists');
      setIsOpen(true);
      HSOverlay?.close("#" + modal_id);

      e.preventDefault();
      e.stopPropagation();
    }
  }

  const handleCancel = () => {
    HSOverlay?.close("#" + modal_id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated_list = {
      list_id: list_id,
      title: title,
      description: description,
    };

    try {
      const response = await fetch('/api/lists/editSongList', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated_list)
      });
      
      const response_data = await response.json();
      if (response.ok) {
        onSave(response_data.body);
        handleCancel(); // Close the modal after saving
      } else {
        console.log(response_data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const renderForm = () => {
    return (
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

        <div className="w-full">
          <div className="flex justify-between items-center">
            <label htmlFor="list-name-input" className="block text-sm font-medium mb-1 text-light">
                Name
            </label>
            <span className={`block mb-2 text-sm opacity-60 ${title.length < title_char_limit - 10 ? 'invisible' : 'visible'}`}>
              {title.length} / {title_char_limit}
            </span>
          </div>

          <input 
            id="list-name-input"
            maxLength={title_char_limit}
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center">
            <label htmlFor="list-desc-textarea" className="block text-sm font-medium mb-1 text-light">
              Description <span className="opacity-60">(Optional)</span>
            </label>
            <span className={`block mb-2 text-sm opacity-60 ${description.length < description_char_limit - 25 ? 'invisible' : 'visible'}`}>
              {description.length} / {description_char_limit}
            </span>
          </div>
          <textarea 
            id="list-desc-textarea" 
            className="py-2 px-3 block w-full bg-gray-dark rounded-md text-sm focus:border-gray focus:ring-gray disabled:opacity-50 disabled:pointer-events-none" 
            rows="3"
            maxLength={description_char_limit}
            value={description}
            onChange={(e) => { setDescription(e.target.value) }}
          >
          </textarea>
        </div>

        <div className="flex justify-end items-center gap-x-2 p-3">
          <button 
            type="button" 
            onClick={handleCancel}
            className="btn hs-dropup-toggle gap-x-2 text-sm font-medium rounded-md text-gray hover:bg-dark hover:bg-opacity-40" 
            data-hs-overlay={"#" + modal_id}>
            Cancel
          </button>
          <button 
            disabled={!title}
            onClick={handleSubmit} 
            className="btn gap-x-2 text-sm rounded-md bg-blue hover:bg-opacity-80 text-light disabled:opacity-50"
          >
            Save
          </button>
        </div>

      </form>
    )
  }

  return (
    session?.status === "authenticated" && session?.user?.username === username &&
    <>
      <button onClick={handleClick} type="button" className="inline-flex items-center p-2 bg-dark-light text-white rounded-md hover:bg-blue" data-hs-overlay={"#" + modal_id}>
        <PencilSimple weight="bold" className="mr-1" /> Edit List Details
      </button>

      <div id={modal_id} className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">
            
            <div className="flex justify-between items-center py-3 px-4">
              <h3 className="font-bold">Edit List</h3>
              <button type="button" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#" + modal_id}>
                <span className="sr-only">Close</span>
                <X size={18} />
              </button>
            </div>

            <div className="px-4 py-1">
              {renderForm()}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

