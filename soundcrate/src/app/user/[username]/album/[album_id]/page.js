export default function AlbumReviewPage({ params }) {
const { username, album_id } = params;

  return (
    <h1>AlbumReviewPage for {album_id} by {username}</h1>
  );
}