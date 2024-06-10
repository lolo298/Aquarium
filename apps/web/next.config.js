// @ts-check

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
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
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "ofnectvdmnyxxznhaagk.supabase.co",
      },
    ],
  },
  output: "export",
  distDir: "dist",
};
