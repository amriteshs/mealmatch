import React from 'react';
import LoginPage from './login';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import ProtectedRoute from './Protected.route';

class LandingPage extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={LoginPage}/>
                    <Route exact path='/login' component={LoginPage}/>
                    {/* <Route exact path='/signup' component={SignUpPage}/> */}
                    {/* <ProtectedRoute 
                        exact 
                        path='/home' 
                        component={HomePage}
                    /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default LandingPage;