import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LoginPage from './login';
import SignUpPage from './signup';
import HomePage from './home';
import UserHomePage from './user-home';
import ContributePage from './user-contribute';

class LandingPage extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={HomePage}/>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/signup' component={SignUpPage}/>
                    <Route exact path='/home' component={HomePage}/>
                    <Route exact path='/:username' component={UserHomePage}/>
                    <Route exact path='/:username/contribute' component={ContributePage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default LandingPage;