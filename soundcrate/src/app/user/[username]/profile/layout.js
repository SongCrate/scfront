import { 
  get_album_ids,
  get_followers,
  get_following,
  get_lists,
  get_reviews,
  get_user 
} from '/utils';
import Link from 'next/link';

export default function UserProfileLayout({ children, params }) {
  const { username } = params;
  const user = get_user(username)

  const user_data = {
    profile_img: user.image_url,
    review_count: get_reviews(username).length,
    album_count: get_album_ids(username).length,
    list_count: get_lists(username).length,
    follower_count: get_followers(username).length,
    following_count: get_following(username).length
  }

  return (
    <div className="flex flex-col gap-6">
      {/* profile details */}
      <section className="flex flex-end gap-5 items-end">

        {/* user profile picture */}
        <img
          src={user_data.profile_img ?? "/images/default-user.png"} 
          alt={username}
          className="rounded-md object-cover w-[70px] h-[70px]"
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
              number={user_data.list_count}
              label={"Lists"}
              href={`/user/${username}/profile/lists`}
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