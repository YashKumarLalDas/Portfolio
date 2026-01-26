/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // REQUIRED for GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true, // REQUIRED because Next Image optimization needs a server
  },
  basePath: "/Portfolio", // Your repo name
  assetPrefix: "/Portfolio/",
};

module.exports = nextConfig;
