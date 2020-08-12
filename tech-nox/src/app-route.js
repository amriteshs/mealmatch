import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './protected-route';

import LoginPage from './login';
import SignUpPage from './signup';
import HomePage from './home';
import AboutPage from './about';
import UserHomePage from './user-home';
import ContributePage from './user-contribute';
import UserAboutPage from './user-about';


class LandingPage extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={HomePage}/>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/signup' component={SignUpPage}/>
                    <Route exact path='/home' component={HomePage}/>
                    <Route exact path='/about' component={AboutPage}/>
                    <Route exact path='/:username' component={UserHomePage}/>
                    <Route exact path='/:username/contribute' component={ContributePage}/>
                    <Route exact path='/:username/about' component={UserAboutPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default LandingPage;
