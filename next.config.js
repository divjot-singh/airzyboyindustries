/** @type {import('next').NextConfig} */
module.exports = {
    env: {
        GOOGLE_SERVICE_PRIVATE_KEY: process.env.GOOGLE_SERVICE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        NEXT_PRIVATE_PASSWORD: process.env.NEXT_PRIVATE_PASSWORD
      },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
        config.resolve.fallback.tls = false;
        config.resolve.fallback.net = false;
        config.resolve.fallback.child_process = false;
      }
  
      return config;
    },
  };