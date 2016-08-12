'use strict';

var url = require('url');

module.exports = router => {

    router.get('/', function(req, res) {
    	res.render(url.parse(req.originalUrl).pathname, {});
    });

};
