/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Chrome from 'templates/Chrome';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

module.exports = (
    <Router history={hashHistory}>
        <Route path="/shelter/" component={Chrome} />
    </Router>
);
