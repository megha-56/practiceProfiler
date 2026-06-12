// /** @type {import('next').NextConfig} */
// const nextConfig = {};
// module.exports = nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     turbo: {
//       root: __dirname,
//     },
//   },
// };

// module.exports = nextConfig;




cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
};
export default nextConfig;
EOF