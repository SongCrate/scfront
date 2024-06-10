'use client';

export default function EmptyContentMessage({ message }) {
  return (
    <div className="box-container flex flex-col gap-4">
      <p className="opacity-40 p-2">
        {message}
      </p>
    </div>
  );
}