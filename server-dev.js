require('babel-core/register');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line import/no-extraneous-dependencies, max-len
const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line import/no-extraneous-dependencies, max-len
const server = require('./index');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

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
