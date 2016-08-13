const url = require('url');

module.exports = router => {
	// eslint-disable-next-line prefer-arrow-callback
    router.get('/', function baseRouteHandler(req, res) {
        res.render(url.parse(req.originalUrl).pathname, {});
    });
};
