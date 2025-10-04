const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .riv to asset extensions
config.resolver.assetExts.push('riv');

module.exports = config;

