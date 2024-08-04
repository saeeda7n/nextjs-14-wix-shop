/** @type {import("next").NextConfig} */
const nextConfig = {
 experimental: {
  typedRoutes: true
 },
 images: {
  remotePatterns: [{ hostname: "*" }]
 }

};

export default nextConfig;