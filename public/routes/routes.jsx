/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Chrome from 'templates/Chrome';

module.exports = (
    <Router history={hashHistory}>
        <Route path="/shelter/" component={Chrome} />
    </Router>
);
