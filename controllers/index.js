const url = require('url');

module.exports = router => {
	// eslint-disable-next-line prefer-arrow-callback
    router.get('/', function rootHandler(req, res) {
        res.render(url.parse(req.originalUrl).pathname, {});
    });
};
