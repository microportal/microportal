const path = require('path')
const fs = require('fs')
// const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: 'src/microportal.js',
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            }
        ],
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
        CopyWebpackPlugin([
            {from: path.resolve(__dirname, 'src/index.html')},
            {from: path.resolve(__dirname, 'libs/system.js')}
        ]),
        new CleanWebpackPlugin(['release'])
    ],
    devtool: 'source-map',
    externals: [],
    devServer: {
        contentBase: './release',
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000},
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        // Proxy config,
        proxy: {
            "/login-ui": {
                target: "http://localhost:9001",
                pathRewrite: {"^/login-ui": ""}
            },
            "/core-ui": {
                target: "http://localhost:9002",
                pathRewrite: {"^/core-ui": ""}
            },
            "/core-service": {
                target: "http://localhost:9090",
                pathRewrite: {"^/core-service": ""}
            },
            "/login-service": {
                target: "http://localhost:8080"
            }
        }
    }
};
