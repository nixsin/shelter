/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import 'css/app.less';

import Routes from 'routes/routes.jsx';
import ReactEngineClient from 'react-engine/lib/client';

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
