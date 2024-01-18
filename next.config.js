/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pics.freeicons.io",
            },
            {
                protocol: "https",
                hostname: "icons8.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "http",
                hostname: "backend-free-shopping.onrender.com",
            },
        ],
    },
    env: {
        FAKE_CACHE: process.env.FAKE_CACHE,
    },
};

module.exports = nextConfig;
