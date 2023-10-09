/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pics.freeicons.io'
            }
        ]
    }
}

module.exports = nextConfig
