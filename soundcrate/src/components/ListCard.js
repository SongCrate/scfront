import Link from 'next/link';

export default function ListCard({ 
  username,
  name="List Name",
  song_count=0,
  show_username=false
 }) {

  return (
    <Link href="">
      {/* 1 - list details */}
      <div className="max-h-fit py-3 flex flex-col gap-1">
        
        {/* 1.1 list name */}
        <h4>
          {name}
        </h4>

        {/* 1.2 song count */}
        <p className="text-sm uppercase opacity-70">
          <span>
            {song_count} {song_count == 1 ? "song" : "songs"}
          </span>
          {show_username &&
            <span className="ml-1">
              ∙ by {username}
            </span>
          }
        </p>
        
      </div>
    </Link>
  );
}
