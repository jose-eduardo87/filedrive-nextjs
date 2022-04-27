/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  reactStrictMode: false,
  i18n,
};

module.exports = nextConfig;
