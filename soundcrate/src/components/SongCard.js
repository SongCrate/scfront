"use client"

import Link from "next/link";

export default function SongCard({song_name, i, song_id}) {
    return (
        <Link href={`/song/${username}/${song_id}`}>
            <div className={"mt-5 bg-dark-light p-3 rounded-md border-2 border-dark-dark w-[600px] hover:border-gray"}>
                <div className={"flex"}>
                    <p className="text-md opacity-70 mr-2">{i+1}</p>
                    <p className={"text-md"}>{song_name}</p>
                </div>
                <p className={"text-xs ml-4"}>1.3K REVIEWS</p>
            </div>
        </Link>
    );
}