export default function SongPage({ params }) {
  const { song_id } = params
  return (
      <h2>SongPage for {song_id}</h2>
  );
}