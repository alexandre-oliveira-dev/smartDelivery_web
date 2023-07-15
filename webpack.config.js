const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // Aqui você pode adicionar regras para carregamento de diferentes tipos de arquivos
    ],
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },
  // Outras configurações do Webpack
};
