'use strict';

require('babel-core/register');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const server = require('./index');

let webpackConfig = require('./webpack.config');
let compiler = webpack(webpackConfig);

server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
}));

server.use(webpackHotMiddleware(compiler));
server.listen(process.env.PORT || 8000, function krakenListener(err) {
    if (err) {
        console.error(err);
    }
    console.log('Server listening on http://localhost:%d', this.address().port);
});
