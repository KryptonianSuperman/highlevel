'use client';

import { Component, type ReactNode } from 'react';
import { Button } from '@/shared/components/ui/button';

type State = { hasError: boolean };

export class LocalErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="space-y-3 rounded-lg border border-red-300 p-4">
          <p>Could not load this section.</p>
          <Button onClick={() => this.setState({ hasError: false })}>
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
