import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Home } />
      </Switch>
    );
  }
}

export default App;
