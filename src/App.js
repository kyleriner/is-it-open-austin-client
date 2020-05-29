import React, { Component } from 'react';
import Authentication from './auth/Authentication'
import AppMain from './main/AppMain'
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends Component {

  constructor(props){
    super(props)
    this.loginComplete = this.loginComplete.bind(this);
  }

  isLoggedIn = () => {
    if (localStorage.getItem('userToken')) {
      console.log('true')

      return true;
    } else {
      console.log('false')
      return false;
    }
  }

  logout = () => {
    localStorage.clear();
    this.forceUpdate();
  }

  loginComplete = () => {
    this.forceUpdate();
  }



render() {

  let loggedIn = this.isLoggedIn()

  return (
    <div className='App-header'>
    <Router>
      {console.log(loggedIn)}
      <Route exact path='/' >
        {loggedIn ? (<Redirect to='/main' />) : (<Redirect to="/login"/>)}
      </Route>
      <Route exact path='/main'>
        <AppMain logout={this.logout}/>
      </Route>
      <Route exact path='/login'>
        <Authentication loginComplete={this.loginComplete}/>
      </Route>
    </Router>
    </div>
  );
  }
}

export default App;
