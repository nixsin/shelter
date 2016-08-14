'use strict'; // eslint-disable-line strict

const babelConfig = require('./package.json').babel;
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    eslint: {
        configFile: '.eslintrc'
    },
    devtool: 'source-map',
    entry: {
        app: './public/js/app.js',
        framework: [
            'react-engine/lib/client'
        ]
    },
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'js/[name].js',
        publicPath: '/'
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'eslint-loader', exclude: [/node_modules/] },
            { test: /\.jsx$/, loaders: ['eslint-loader'], exclude: [/node_modules/] }
        ],
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], exclude: [/node_modules/] },
            { test: /\.jsx$/, loaders: ['babel-loader'], exclude: [/node_modules/] },
            { test: /\.json$/, loaders: ['json-loader'] },
            { test: /\.less$/i, loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap') },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'framework',
            minChunks: 3
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: false,
            output: {
                beautify: true
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.less'],
        root: __dirname,
        modulesDirectories: resolveModulesDirectories() // eslint-disable-line no-use-before-define
    }
};

function resolveModulesDirectories() {
    const plugins = babelConfig.plugins;
    let resolverConfig;
    let modulesDirectories = ['node_modules'];
    for (let i = 0; i < plugins.length; i++) {
        if (plugins[i][0] === 'resolver') {
            resolverConfig = plugins[i][1];
            break;
        }
    }
    if (resolverConfig && Array.isArray(resolverConfig.resolveDirs)) {
        modulesDirectories = modulesDirectories.concat(resolverConfig.resolveDirs);
    }

    return modulesDirectories;
}
