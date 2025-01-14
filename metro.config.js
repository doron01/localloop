const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
    blacklistRE: /node_modules\/.*\/node_modules\/react-native\/.*/,
  },
  watchFolders: [__dirname],
}; 