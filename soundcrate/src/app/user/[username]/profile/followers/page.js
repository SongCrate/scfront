import { FollowUserCard } from '@/components';

export default function UserFollowersPage({ params }) {
  const { username } = params;
  
  // mock data
  const follower_data = [
    { 
      username: "johndoe",
      profile_img: null,
      review_count: 10,
      album_count: 3
    },
    { 
      username: "musicluvr9",
      profile_img: null,
      review_count: 29,
      album_count: 7
    },
  ];

  const follow_user_cards = follower_data.map((user, i) =>
    <FollowUserCard
      key={`follow-user-card-${i}`} 
      user_data={user} />
  );

  return (
    <main className="flex flex-col gap-4">
      <h2>Followers</h2>
      <div className="box-container flex flex-col gap-4">
        {follow_user_cards}
      </div>
    </main>
  );
}