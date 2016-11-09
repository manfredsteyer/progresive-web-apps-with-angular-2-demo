var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

var webpack = require('webpack');
var path = require("path");

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    debug: true,
    devtool: 'source-map',
    entry: {
        'sw': './app/service-worker/service-worker'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: "dist/"
    },
      resolve: {
        extensions: ['', '.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css']
    },
    module: {
        loaders: [
            { test: /\.(jpg|jpeg|gif|png)$/, loader:'file-loader?name=img/[path][name].[ext]' },
            { test: /\.css$/, loader:'raw-loader' },
            { test: /\.html$/,  loaders: ['html-loader'] },
            { test: /\.ts$/, loaders: ['awesome-typescript-loader'], exclude: /node_modules/}
        ]
    },
    plugins: [
    ],
    node: {
        __filename: true
    },
    devServer: {
        inline:true,
        port: 8085,
        // historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }

};
