/* eslint-disable no-console */

const express = require('express');
const kraken = require('kraken-js');

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
const options = {
    onconfig: function onconfig(config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        next(null, config);
    }
};

const app = module.exports = express();
app.use(kraken(options));
app.on('start', () => {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
