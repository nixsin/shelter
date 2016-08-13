const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLESS = new ExtractTextPlugin('css/app.css');

module.exports = {
    eslint: {
        configFile: '.eslintrc'
    },
    devtool: 'source-map',
    entry: [
        './public/js/app.js'
    ],
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'js/app.js',
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
            { test: /\.less$/i, loader: extractLESS.extract(['css','less'])},
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        extractLESS
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.less'],
        root: __dirname,
        modulesDirectories: [
            'node_modules',
            './public/components',
            './public/lib',
            './public/templates'
        ]
    }
};
