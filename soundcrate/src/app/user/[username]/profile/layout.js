import Image from 'next/image';
import Link from 'next/link';

export default function UserProfileLayout({ children, params }) {
  const { username } = params;

  // mock user data
  const user_data = {
    profile_img: "/images/janedoe-user.jpg",
    review_count: 19,
    album_count: 3,
    follower_count: 89,
    following_count: 6
  }

  return (
    <div className="flex flex-col gap-6">
      {/* profile details */}
      <section className="flex flex-end gap-5 items-end">

        {/* user profile picture */}
        <Image
          src={user_data.profile_img ?? "/images/default-user.png"} 
          alt={username}
          width={70}
          height={70}
          className="rounded-md"
        />

        <div className="flex flex-col gap-1">
          <Link href={`/user/${username}/profile`}>
            <h1>{username}</h1>
          </Link>
          {/* stats container: reviews, albums, followers, following */}
          <div className="flex flex-nowrap gap-2 items-end">
            <UserProfileStatistic
              number={user_data.review_count}
              label={"Reviews"}
              href={`/user/${username}/profile/reviews`}
            />
            <UserProfileStatistic
              number={user_data.album_count}
              label={"Albums"}
              href={`/user/${username}/profile/albums`}
            />
            <UserProfileStatistic
              number={user_data.follower_count}
              label={"Followers"}
              href={`/user/${username}/profile/followers`}
            />
            <UserProfileStatistic
              number={user_data.following_count}
              label={"Following"}
              href={`/user/${username}/profile/following`}
            />
          </div>

        </div> 
      </section>
      {children}
    </div>
  );
}

function UserProfileStatistic({ number, label, href="" }) {
  return (
    <Link href={href}>
      <span className="flex items-baseline gap-1.5 px-0.5">
        <span className="font-semibold">{number}</span>
        <span className="uppercase text-sm opacity-60 tracking-wider">{label}</span>
      </span>
    </Link>
  );
}