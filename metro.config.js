const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// รองรับไฟล์ .wasm ของ expo-sqlite
config.resolver.assetExts.push("wasm");

// รองรับ SharedArrayBuffer สำหรับ SQLite บน Web
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

    return middleware(req, res, next);
  };
};

module.exports = config;
