/** @type {import('next').NextConfig} */
const isProductionBuild = process.env.NODE_ENV === "production";

const nextConfig = {
  trailingSlash: true,
  ...(isProductionBuild ? { output: "export" } : {}),
};

export default nextConfig;
