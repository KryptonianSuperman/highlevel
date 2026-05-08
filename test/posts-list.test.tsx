import { createElement } from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PostsList } from '@/features/posts/components/posts-list';
import { renderWithProviders } from './test-utils';

describe('PostsList', () => {
  it('renders initial posts', () => {
    renderWithProviders(
      createElement(PostsList, {
        initialPosts: [
          { id: 1, title: 'First Post', body: 'Hello world' },
          { id: 2, title: 'Second Post', body: 'Another body' },
        ],
      }),
    );

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });
});
