export async function register(): Promise<void> {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
    return;
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initializeNodeMocks } = await import('@/core/mocks/init');
    await initializeNodeMocks();
  }
}
