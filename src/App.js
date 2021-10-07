import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './styles/App.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
    return (
        /* Default path is home */
        <Router>
            <Route exact path='/'>
                {
                    <Redirect to='/home'/>
                }
            </Route>
            <Route exact path='/home' component={ Home }/>
            <Route exact path='/login' component={ Login }/>
            <Route exact path='/register' component={ Register }/>
        </Router>
    );
};

export default App;
