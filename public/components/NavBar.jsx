/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        if (this.props && false) {
            return null;
        }
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="http://www.paypal.com">
                            <img alt="Brand" src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg" />
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

module.exports = NavBar;
