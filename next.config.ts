import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '5.161.42.119',
                port: '8080',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '5.161.42.119',
                port: '8080',
                pathname: '/images/**',
            },
        ],
        // Optional: Configure domains if you want to use Next.js Image with remote images directly
        domains: ['5.161.42.119'],
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: '/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
