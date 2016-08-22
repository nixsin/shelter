/* eslint-disable no-console */

require('babel-core/register');
const http = require('http');
const app = require('./index');
const packageJson = require('./package.json');

/*
 * Create and start HTTP server.
 */
const server = http.createServer(app);
server.listen(process.env.PORT || packageJson.config.port);
server.on('listening', function krakenListener(err) {
    if (err) {
        console.error(err);
    }
    console.log('Server listening on http://localhost:%d', this.address().port);
});
