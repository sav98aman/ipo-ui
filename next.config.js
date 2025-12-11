/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    allowedDevOrigins: [
        'localhost',
        '127.0.0.1',
        '*.replit.dev',
        '*.riker.replit.dev',
        '*.repl.co'
    ],
};

module.exports = nextConfig;
