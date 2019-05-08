import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StreetArtDetail from './pages/StreetArtDetail'
import api from '../api';
import MainNavbar from './MainNavbar'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <MainNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
          <Route path="/street-art-detail/:streetArtId" component={StreetArtDetail} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}