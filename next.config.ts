// next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.myshifaa.com",
        port: "",
        pathname: "/api/v1/attachments/**",
      },
    ],
  },
  i18n,
  // any other config options
};

module.exports = nextConfig;
