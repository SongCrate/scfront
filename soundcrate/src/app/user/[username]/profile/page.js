export default function UserProfilePage({ params }) {
  const { username } = params;

  return (
    <>
      <h1>UserProfilePage for {username}</h1>
    </>
  );
}