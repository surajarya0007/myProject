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

