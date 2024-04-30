import Link from 'next/link';

export default function NavBar() {
  return (
    <div class="bg-gradient-to-b from-[#0a1017] pt-8 pb-10">
      <div class="main-container flex justify-between items-center">

        {/* site title */}
        <h2 class="text-3xl font-bold truncate">
          <Link href="/">soundcrate</Link>
        </h2>

        {/* navigation buttons */}
        <div class="flex gap-2">
            <button type="button" class="btn">
              <Link href="/register">Register</Link>
            </button>
            <button type="button" class="btn">
              <Link href="/login">Login</Link>
            </button>
        </div>

      </div>
    </div>
  );
}