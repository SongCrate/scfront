import Link from 'next/link';

export default function ListCard({ list_data={} }) {
  const username = "janedoe";

  return (
    <Link href="">
      {/* 1 - list details */}
      <div className="max-h-fit py-3 flex flex-col gap-1">
        
        {/* 1.1 list name */}
        <h4>
          {list_data.list_name}
        </h4>

        {/* 1.2 song count */}
        <p className="text-sm uppercase opacity-70">
          {list_data.song_count} {list_data.song_count == 1 ? "song" : "songs"}
        </p>
        
      </div>
    </Link>
  );
}
