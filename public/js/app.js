'use strict';

// import the react-router routes
let Routes = require('../routes/routes.jsx');

// import the react-engine's client side booter
let ReactEngineClient = require('react-engine/lib/client');

// boot options
let options = {
    routes: Routes,

    // supply a function that can be called
    // to resolve the file that was rendered.
    viewResolver: viewName => {
        return require('../templates' + viewName);
    }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
    // boot the app when the DOM is ready
    ReactEngineClient.boot(options);
});
