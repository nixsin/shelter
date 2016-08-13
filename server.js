/* eslint-disable no-console */

require('babel-core/register');
const app = require('./index');
const http = require('http');

/*
 * Create and start HTTP server.
 */
const server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function krakenListener(err) {
    if (err) {
        console.error(err);
    }
    console.log('Server listening on http://localhost:%d', this.address().port);
});
