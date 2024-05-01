import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="bg-gradient-to-b from-[#0a1017] pt-8 pb-10">
      <div className="main-container flex justify-between items-center">

        {/* site title */}
        <h2 className="text-3xl font-bold truncate">
          <Link href="/">soundcrate</Link>
        </h2>

        {/* navigation buttons */}
        <div className="flex gap-2">
            <button type="button" className="btn">
              <Link href="/register">Register</Link>
            </button>
            <button type="button" className="btn">
              <Link href="/login">Login</Link>
            </button>
        </div>

      </div>
    </div>
  );
}