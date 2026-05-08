import Link from 'next/link';

export default function NotFound(): React.ReactElement {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-2">
      <h2 className="text-xl font-semibold">Not found</h2>
      <Link href="/" className="text-blue-600 underline">
        Back home
      </Link>
    </main>
  );
}
