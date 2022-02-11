const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  mode: 'development',
  devServer: {
    port: 8098,
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
          'babel-loader',
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
        use: [ 'style-loader', 'css-loader' ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
        {
            name: 'Books',
            filename:
                'remote.js',
            exposes: {
                './BooksComponent':
                    './src/BooksComponent',
            },
            shared: [{
                react: {
                    singleton: true,
                    requiredVersion: "^17.0.2",
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: "^17.0.2",
                },
            }
            ],
        }),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};
