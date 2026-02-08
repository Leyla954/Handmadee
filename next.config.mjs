/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["antd"], // Ant Design komponentlərini server-side transpile edir
};

export default nextConfig;
