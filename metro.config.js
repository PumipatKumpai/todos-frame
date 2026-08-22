const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Support .wasm files for expo-sqlite on Web
config.resolver.assetExts.push("wasm");

// Required for SharedArrayBuffer
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");

    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

    return middleware(req, res, next);
  };
};

module.exports = config;
