import React from 'react'
import {Provider} from 'react-redux';
import {ReactDom, render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Main from './Main'
import store from './state/store'

const flexContainer = {
    display: "flex"
};

const app = document.getElementById('app');
render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router>
                <Main />
            </Router>
        </Provider>
    </MuiThemeProvider>
    , app
)