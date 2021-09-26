import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddArticle from './components/add-article/AddArticle';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear Current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/';
  } 
}

class App extends Component {
  render() {
    return ( 
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/Landing" component = { Landing } />
            <div className="container">
              <Route exact path="/register" component = { Register } />
              <Route exact path="/" component = { Login } />
              <Route exact path="/profiles" component = { Profiles } />
              <Route exact path="/profile/:handle" component = { Profile } /> 
              <Switch>
                <PrivateRoute exact path="/dashboard" component = { Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component = { CreateProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component = { EditProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-article" component = { AddArticle } />
              </Switch>
              <Route exact path="/not-found" component = { NotFound } /> 
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
      );
  }
}

export default App;
