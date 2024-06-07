'use client';

export default function EmptyContentMessage({ message }) {
  return (
    <div className="text-center text-gray-500 py-4">
      {message}
    </div>
  );
}