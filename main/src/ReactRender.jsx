/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

/**
 * 渲染子应用
 */
function Render(props) {
    const { loading } = props;

    return (
        <React.StrictMode>
            <button
                onClick={() => {
                    window.history.pushState({}, 'one', '/one');
                }}
            >
                1
            </button>
            <button
                onClick={() => {
                    window.history.pushState({}, 'one', '/two');
                }}
            >
                2
            </button>
            {loading && <h4 className="subapp-loading">Loading...</h4>}
            <div id="subapp-viewport" />
        </React.StrictMode>
    );
}

export default function render({ loading }) {
    const container = document.getElementById('root');
    ReactDOM.render(<Render loading={loading} />, container);
}

serviceWorker.unregister();
