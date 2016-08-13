/* eslint-disable jsx-a11y/html-has-lang, max-len, react/prop-types */

import React from 'react';

const Chrome = (props) => (
    <html>
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
            <meta name="robots" content="noindex" />
            {/* <link rel="stylesheet" href="css/app.css" /> */}

            <link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://www.paypalobjects.com/webstatic/icon/pp144.png" />
            <link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://www.paypalobjects.com/webstatic/icon/pp114.png" />
            <link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://www.paypalobjects.com/webstatic/icon/pp72.png" />
            <link rel="apple-touch-icon-precomposed" href="https://www.paypalobjects.com/webstatic/icon/pp64.png" />
            <link rel="shortcut icon" sizes="196x196" href="https://www.paypalobjects.com/webstatic/icon/pp196.png" />
            <link rel="shortcut icon" type="image/x-icon" href="https://www.paypalobjects.com/webstatic/icon/favicon.ico" />
            <link rel="icon" type="image/x-icon" href="https://www.paypalobjects.com/webstatic/icon/pp32.png" />
            <link rel="apple-touch-icon" href="https://www.paypalobjects.com/en_US/i/pui/apple-touch-icon.png" />

            <title>PayPal</title>
        </head>
        <body>
            <div className="outerWrapper" id="outerWrapper">
                {props.children}
                <div className="jumbotron">
                    <h1>Hello, world!</h1>
                    <p>...</p>
                    <p><a className="btn btn-primary btn-lg" href="http://www.paypal.com" role="button">Learn more</a></p>
                </div>
            </div>
            <script src="js/app.js" />
        </body>
    </html>
);

module.exports = Chrome;
