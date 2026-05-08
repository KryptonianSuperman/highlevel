import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@reduxjs/toolkit', 'react-redux', 'sonner'],
  },
};

export default withBundleAnalyzer(nextConfig);
