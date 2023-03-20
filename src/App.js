import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/cart" component={ Cart } />
          <Route path="/product/:productId" component={ ProductDetails } />
        </Switch>
      </Router>
    );
  }
}

export default App;
