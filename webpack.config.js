var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = function(env) {
  var debug = env !== "production";

  return {
    devtool: debug ? "inline-sourcemap" : "source-map",
    entry: {
      app: path.join(__dirname, "/src/index.js"),
      vendor: [
        "bootstrap",
        "classnames",
        "jquery",
        "object-assign",
        "prop-types",
        "react",
        "react-bootstrap",
        "react-bootstrap-dropdown-menu",
        "react-dom",
        "react-notifications",
        "react-loading-overlay",
        "react-popper",
        "react-router",
        "react-router-dom",
        "react-treeview",
        "react-transition-group"        
      ]
    },
    output: {
      path: path.join(__dirname, "public/dist"),
      filename: "[name].bundle.js"
    },
    module: {
      loaders: [
        {
          enforce: "pre",
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "eslint-loader",
              options: {
                failOnWarning: false,
                failOnError: true
              }
            }
          ]
        },
        {
          test: /.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            /* plugins: ['transform-runtime'], */
            presets: ["es2015", "stage-0", "react"]
          }
        },
        {
          test: /.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }]
        },
        {
          test: /.(woff2?|ttf|eot|svg|png|jpe?g|gif|otf)$/,
          loader: "file-loader"
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles/css/styles.css"),
      
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "vendor.bundle.js"
      }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: false,
        include: /\*\.bundle\.js/,
        sourceMap: true
      }) 
    ],
    devServer: {
      contentBase: __dirname,
      historyApiFallback: true
    },
    watch: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  };
};
