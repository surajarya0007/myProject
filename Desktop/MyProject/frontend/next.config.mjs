/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['assets.example.com', 'lh3.googleusercontent.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.example.com',
          port: '',
          pathname: '/account123/**',
        },
      ],
    },
  }
  
  export default nextConfig;
  