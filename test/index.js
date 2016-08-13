/* global describe:false, it:false, beforeEach:false, afterEach:false*/

const kraken = require('kraken-js');
const express = require('express');
const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');


describe('index', () => {
    let app;
    let mock;


    beforeEach((done) => {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: path.resolve(__dirname, '..'),
        }));

        mock = app.listen(1337);
    });


    afterEach((done) => {
        mock.close(done);
    });


    it('should say "hello"', (done) => {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Hello, /)
            // eslint-disable-next-line prefer-arrow-callback, no-unused-vars
            .end(function endHandler(err, res) {
                done(err);
            });
    });
});
