// @ts-check

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: "export",
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
};
