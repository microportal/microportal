const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

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
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        ],
    },
    node: {
        fs: 'empty',
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
        new CopyPlugin([
            {from: path.resolve(__dirname, 'src/index.html')},
            {from: path.resolve(__dirname, 'libs/system.js')},
        ]),
        new CleanWebpackPlugin(),
    ],
    devtool: 'source-map',
    externals: [],
    // Proxy config,
    devServer: {
        contentBase: './release',
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000},
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        proxy: {
            '/login-ui': {
                target: 'http://localhost:9001',
                pathRewrite: {'^/login-ui': ''},
            },
            '/core-ui': {
                target: 'http://localhost:9002',
                pathRewrite: {'^/core-ui': ''},
            },
            '/menu-ui': {
                target: 'http://localhost:9003',
                pathRewrite: {'^/menu-ui': ''},
            },
            '/auth': {
                target: 'http://localhost:7000',
            },
            '/core-service': {
                target: 'http://localhost:9090',
            },
            '/login-service': {
                target: 'http://localhost:9091',
            },
            '/menu-service': {
                target: 'http://localhost:9092',
            },
        },
    },
}
