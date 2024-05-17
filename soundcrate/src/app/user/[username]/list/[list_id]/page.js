export default function ListPage({ params }) {
const { username, list_id } = params;

  return (
    <main>
      List for {list_id} by {username}
    </main>
  );
}