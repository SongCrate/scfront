export default function UserFollowingPage({ params }) {
  const { username } = params;

  return (
    <h1>UserFollowingPage for {username}</h1>
  );
}