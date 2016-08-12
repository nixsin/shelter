'use strict';

let path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './public/js/app.js'
    ],
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'js/app.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: [/node_modules/]
            },
            {
                test: /\.jsx$/,
                loaders: ['babel-loader'],
                exclude: [/node_modules/]
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    },
    plugins: [
        
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
