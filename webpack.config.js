'use strict'; // eslint-disable-line strict

const babelConfig = require('./package.json').babel;
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
//let ClosureCompilerPlugin = require('webpack-closure-compiler');

function getConfig(env) {
    const isProd = env && env === 'production';

    const baseConfig = {
        devtool: 'source-map',
        entry: {
            app: './public/js/app.js',
            framework: isProd ? ['react-engine/lib/client'] : ['react-engine/lib/client', 'webpack/hot/dev-server', 'webpack-hot-middleware/client'] // eslint-disable-line max-len
        },
        eslint: {
            configFile: '.eslintrc'
        },
        module: {
            preLoaders: [
                { test: /\.js$/, loader: 'eslint-loader', exclude: [/node_modules/] },
                { test: /\.jsx$/, loader: 'eslint-loader', exclude: [/node_modules/] }
            ],
            loaders: [
                { test: /\.js$/, loaders: isProd ? ['babel-loader'] : ['react-hot', 'babel-loader'], exclude: [/node_modules/] }, // eslint-disable-line max-len
                { test: /\.jsx$/, loaders: isProd ? ['babel-loader'] : ['react-hot', 'babel-loader'], exclude: [/node_modules/] }, // eslint-disable-line max-len
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.less$/i, loader: isProd ? ExtractTextPlugin.extract('css?sourceMap!less?sourceMap') : 'style!css!less' }, // eslint-disable-line max-len
                { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
            ]
        },
        output: {
            filename: 'js/[name].js',
            path: path.join(__dirname, '.build'),
            publicPath: '/'
        },
        plugins: [
            new ProgressBarPlugin(),
            new ExtractTextPlugin('css/[name].css'),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'framework',
                minChunks: 3
            })
        ],
        resolve: {
            extensions: ['', '.js', '.jsx', '.json', '.less'],
            modulesDirectories: resolveModulesDirectories(), // eslint-disable-line no-use-before-define, max-len
            root: __dirname
        }
    };

    if (isProd) {
        baseConfig.plugins = baseConfig.plugins.concat([
            new webpack.DefinePlugin({
                process: {
                    env: {
                        NODE_ENV: "'production'"
                    }
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                compress: {
                    warnings: false
                }
            })
            /*new ClosureCompilerPlugin({
                compiler: {
                    language_in: 'ECMASCRIPT6',
                    language_out: 'ECMASCRIPT5',
                    compilation_level: 'SIMPLE'
                },
                concurrency: 3
            })*/
        ]);
    } else {
        baseConfig.devServer = {
            contentBase: '.build',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        };
        baseConfig.plugins = baseConfig.plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]);
    }

    return baseConfig;
}

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

module.exports = getConfig(process.env.NODE_ENV ? process.env.NODE_ENV : 'development');
