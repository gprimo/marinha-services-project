import React, { Fragment } from 'react';
import {Router} from "react-router-dom";
import Routes from './routes';
import { createBrowserHistory } from 'history';

let history = createBrowserHistory();

function App() {

  
    return (
        <Fragment>
            <Router history={history}>
                <Routes />
            </Router>
        </Fragment>
    )
  
}

export default App;

