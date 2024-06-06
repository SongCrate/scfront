'use client';
import {X} from "@phosphor-icons/react";
import {useSession} from "next-auth/react";
import UpdateCredentialsModal from "@/components/UpdateCredentialsModal";

export default function SettingsModal()  {
    const { data: session } = useSession();
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity duration-300 opacity-100 ">
                <div className="bg-dark-light rounded-lg p-6 w-full max-w-lg transition-all duration-300 mt-12">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-normal text-white font-bold mb-3">Account Settings</h2>
                        <button type="button" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40">
                            <span className="sr-only">Close</span>
                            <X size={18} />
                        </button>
                    </div>
                    <div className="mt-4 text-white font-medium flex justify-between -mb-4">
                        <p>Email</p>
                    </div>
                    <div className={"mt-4 text-gray/80 font-medium mb-3"}>
                        {session?.user?.email}
                    </div>

                    <hr className={" my-5 text-gray/80"}></hr>

                    <div className="mt-4 text-white font-medium flex justify-between -mb-4">
                        <p>Username</p>
                    </div>
                    <div className={"mt-4 text-gray/80 font-medium mb-2"}>
                        {session?.user?.username}
                    </div>

                    <hr className={" my-5 text-gray/80"}></hr>

                    <div className="mt-4 text-white font-medium flex justify-between -mb-4">
                        <p>Password</p>
                    </div>
                    <div className={"mt-4 text-gray/80 font-medium"} type="password">
                        ••••••••••••••••
                    </div>
                    <div className="mt-4 flex text-white font-medium">
                        <UpdateCredentialsModal/>
                    </div>
                </div>

            </div>
        );
    };