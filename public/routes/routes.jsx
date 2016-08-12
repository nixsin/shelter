'use strict';

import Chrome from 'Chrome';
import React from 'react';
import { Router, Route, hashHistory} from 'react-router';

module.exports = (
    <Router history={hashHistory}>
        <Route path='/shelter/' component={Chrome}>
        </Route>
    </Router>
);
