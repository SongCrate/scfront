export default function SongReviewPage({ params }) {
  const { username, song_id } = params;

  return (
    <h1>SongReviewPage for {song_id} by {username}</h1>
  );
}