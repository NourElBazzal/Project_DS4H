const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@Assets': path.resolve(__dirname, 'src/Assets'),
    },
  },
};
