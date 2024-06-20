import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
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

// import nextPWA from "@ducanh2912/next-pwa";
// import precache from "@repo/precache";

// const withPWA = nextPWA({
//   dest: "public",
// });

// export default withPWA({
//   webpack: (config, options) => {
//     config.module.rules.push({
//       test: /\.(fbx|glb|gltf|zpt|mind)$/,
//       type: "asset/resource",
//       generator: {
//         filename: "static/chunks/[path][name].[hash][ext]",
//       },
//     });

//     //add plugin
//     // config.plugins.push(new precache());

//     return config;
//   },
//   images: {
//     unoptimized: false,
//     remotePatterns: [
//       {
//         hostname: "localhost",
//       },
//       {
//         hostname: "ofnectvdmnyxxznhaagk.supabase.co",
//       },
//     ],
//   },
//   distDir: "dist",
// });
