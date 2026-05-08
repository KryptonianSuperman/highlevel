import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function HomePage(): React.ReactElement {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Next.js 16 Production Boilerplate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Server-first app router architecture with feature boundaries.</p>
          <Link href="/posts" className="text-blue-600 underline">
            Go to Posts Example
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
