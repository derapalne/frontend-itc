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
        ],
    },
};

module.exports = nextConfig;
