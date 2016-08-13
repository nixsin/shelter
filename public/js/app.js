// import the react-router routes
const Routes = require('../routes/routes.jsx');

// import the react-engine's client side booter
const ReactEngineClient = require('react-engine/lib/client');

// boot options
const options = {
    routes: Routes,

    // supply a function that can be called
    // to resolve the file that was rendered.

    // eslint-disable-next-line global-require
    viewResolver: (viewName) => require(`../templates + ${viewName}`)
};

document.addEventListener('DOMContentLoaded', () => {
    ReactEngineClient.boot(options);
});
