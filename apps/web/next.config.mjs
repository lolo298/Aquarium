import withSerwistInit from "@serwist/next";

// Config of serwist to generate service worker and pwa with installable app
const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  maximumFileSizeToCacheInBytes: 7355608,
  disable: process.env.NODE_ENV === "development",
  additionalPrecacheEntries: ["/", "/viewer"],
  reloadOnOnline: true,
});

/**
 * @type {import('next').NextConfig}
 */
export default withSerwist({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(fbx|glb|gltf|zpt|mind)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });
    return config;
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "ofnectvdmnyxxznhaagk.supabase.co",
      },
    ],
  },
  distDir: "dist",
});
