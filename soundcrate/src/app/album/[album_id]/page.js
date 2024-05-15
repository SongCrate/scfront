export default function AlbumPage({ params }) {
  const { album_id } = params;
  return (
      <h2>AlbumPage for {album_id}</h2>
  );
}