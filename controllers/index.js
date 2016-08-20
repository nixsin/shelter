const url = require('url');

module.exports = router => {
	// eslint-disable-next-line prefer-arrow-callback
    router.get('/', function baseRouteHandler(req, res) {
        const isWebpackDevServer = process.argv.find(v => v.includes('server-dev'));

        res.render(url.parse(req.originalUrl).pathname, {
            externalCSS: !isWebpackDevServer
        });
    });
};
