const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  mode: 'development',
  devServer: {
    port: 8094,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader:
          'file-loader',
        options: {
          presets: [
            '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
            '@babel/preset-react',
          ], // to compile react to ES5
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        loader:
          'css-loader',
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'Main',
        filename:
          'remoteEntry.js',
        remotes: {
          Books:
            'Books@http://localhost:8096/remoteEntry.js',
        },
      }
    ),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};
