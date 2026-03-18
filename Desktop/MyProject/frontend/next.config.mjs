/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: [ 'lh3.googleusercontent.com'],
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'lh3.googleusercontent.com',
//           port: '',
//           pathname: '/account123/**',
//         },
//       ],
//     },
//   }
  
//   export default nextConfig;
  

// next.config.mjs
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = { poll: 1000, ignored: /node_modules/ };
    }
    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'drive.google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/file/d/**',
      },
    ],
  },
};

export default nextConfig;

