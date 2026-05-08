'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function usePostsFilters(): {
  query: string;
  setQuery: (nextValue: string) => void;
} {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = searchParams.get('query') ?? '';

  const setQuery = (nextValue: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue.length > 0) {
      params.set('query', nextValue);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { query, setQuery };
}
