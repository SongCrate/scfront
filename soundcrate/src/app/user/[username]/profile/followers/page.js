export default function UserFollowersPage({ params }) {
  const { username } = params;

  return (
    <h1>UserFollowersPage for {username}</h1>
  );
}