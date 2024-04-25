// @ts-check

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(fbx|glb|gltf|zpt)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "2wovljo9xemmvkkm.public.blob.vercel-storage.com",
      },
    ],
  },
};
