export default function UserPage({ params }) {
  const { username } = params;

  return (
    <>
      <h1>UserPage for {username}</h1>
    </>
  );
}