import 'bootstrap/less/bootstrap.less';
import '../css/app.less';

const Routes = require('../routes/routes.jsx');
const ReactEngineClient = require('react-engine/lib/client');

const options = {
    routes: Routes,

    viewResolver: (viewName) => {
        // eslint-disable-next-line global-require
        require(`../templates + ${viewName}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ReactEngineClient.boot(options);
});
