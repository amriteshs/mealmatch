import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './protected-route';

import LoginPage from './login';
import SignUpPage from './signup';
import UserHomePage from './user-home';
import ContributePage from './user-contribute';
import AboutPage from './about';


class LandingPage extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={UserHomePage}/>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/signup' component={SignUpPage}/>
                    <Route exact path='/home' component={UserHomePage}/>
                    <Route exact path='/about' component={AboutPage}/>
                    <ProtectedRoute exact path='/:username' component={UserHomePage}/>
                    <ProtectedRoute exact path='/:username/contribute' component={ContributePage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default LandingPage;
