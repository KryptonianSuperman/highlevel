let browserReady = false;
let nodeReady = false;

export async function initializeBrowserMocks(): Promise<void> {
  if (browserReady || typeof window === 'undefined') {
    return;
  }

  const { worker } = await import('./browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
  browserReady = true;
}

export async function initializeNodeMocks(): Promise<void> {
  if (nodeReady || typeof window !== 'undefined') {
    return;
  }

  const { server } = await import('./server');
  server.listen({ onUnhandledRequest: 'bypass' });
  nodeReady = true;
}
