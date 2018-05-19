const path = require('path')
const webpack = require('webpack')

const DIST_DIR = path.resolve(__dirname, './public/js/dist')
const SRC_DIR = path.resolve(__dirname, './public/js')

var config = {
    entry: SRC_DIR + "/index.jsx",
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
        publicPath: DIST_DIR
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                //exclude: '/node_modules/',
            }
        ]
    },
    mode: 'development'
};

module.exports = config;