'use strict'; // eslint-disable-line strict
require('babel-core/register');

const colors = require('colors');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const babelConfig = require('./package.json').babel;
const detection = require('./middleware/detection');

// let ClosureCompilerPlugin = require('webpack-closure-compiler');

const frameworkJS = ['react-engine/lib/client'];
const jsAndJSXExludeRegex = [/node_modules/];
const jsAndJSXLoader = ['babel-loader'];
const buildFolder = '.build';

function getConfig(features) {
    const baseConfig = {
        devtool: 'source-map',
        entry: {
            app: './public/js/app.js',
            framework: features.includeDevLib ? frameworkJS.concat(['webpack/hot/dev-server', 'webpack-hot-middleware/client']) : frameworkJS // eslint-disable-line max-len
        },
        eslint: {
            configFile: '.eslintrc'
        },
        module: {
            loaders: [
                { test: /\.js$|\.jsx$/, loaders: features.includeDevLib ? ['react-hot'].concat(jsAndJSXLoader) : jsAndJSXLoader, exclude: jsAndJSXExludeRegex }, // eslint-disable-line max-len
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.less$/i, loader: features.extractCSS ? ExtractTextPlugin.extract('css?sourceMap!less?sourceMap') : 'style!css!less' }, // eslint-disable-line max-len
                { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
            ]
        },
        output: {
            filename: 'js/[name].js',
            path: path.join(__dirname, buildFolder),
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

    if (features.minify) {
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
            /* new ClosureCompilerPlugin({
                compiler: {
                    language_in: 'ECMASCRIPT6',
                    language_out: 'ECMASCRIPT5',
                    compilation_level: 'SIMPLE'
                },
                concurrency: 3
            }) */
        ]);
    }

    if (features.includeDevLib) {
        baseConfig.devServer = {
            contentBase: buildFolder,
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

    if (features.preLoaders) {
        baseConfig.module.preLoaders = [
            { test: /\.js$|\.jsx$/, loader: 'eslint-loader', exclude: jsAndJSXExludeRegex }
        ];
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

function resolveConfigFeatures() {
    const isDevServer = detection.isDevServer();
    const env = process.env.NODE_ENV;

    let buildRule = 'development';
    let features = { // eslint-disable-line prefer-const
        includeDevLib: true,
        preLoaders: false,
        extractCSS: true,
        minify: false
    };

    if (isDevServer) {
        buildRule = 'development:hmr';
        Object.assign(features, {
            extractCSS: false
        });
    } else if (env === 'production') {
        buildRule = 'production';
        Object.assign(features, {
            includeDevLib: false,
            preLoaders: true,
            minify: true
        });
    }

    console.log(colors.cyan('Build Rule: '), colors.cyan(buildRule));
    console.log(colors.green(JSON.stringify(features, null, 2)));

    return features;
}

module.exports = getConfig(resolveConfigFeatures());
