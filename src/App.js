import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import Checkout from './Pages/Checkout';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Home } exact />
        <Route path="/cart" component={ Cart } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/product/:productId" component={ ProductDetails } />
      </Switch>
    );
  }
}

export default App;
