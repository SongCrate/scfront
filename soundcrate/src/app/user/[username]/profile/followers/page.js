import { 
  get_user,
  get_followers,
  get_album_ids,
  get_username,
  get_reviews
} from '/utils';
import { FollowUserCard } from '@/components';

export default function UserFollowersPage({ params }) {
  const { username } = params;
  
  const follower_ids = get_followers(username);
  const follower_data = follower_ids.map((user_id) => {
    var username = get_username(user_id);
    return (
      {
        username: username,
        profile_img: get_user(username).image_url,
        review_count: get_reviews(username).length,
        album_count: get_album_ids(username).length,
      }
    )
  });

  const follow_user_cards = follower_data.map((user, i) =>
    <FollowUserCard
      key={`follow-user-card-${i}`} 
      username={user.username}
      profile_img={user.profile_img}
      review_count={user.review_count}
      album_count={user.album_count} />
  );

  return (
    <main className="flex flex-col gap-4">
      <h2>Followers</h2>
      <div className="box-container flex flex-col gap-4">
        {follow_user_cards.length > 0 
          ? follow_user_cards
          : <p className="opacity-40 p-2">Nothing to see here!</p>
        }
      </div>
    </main>
  );
}