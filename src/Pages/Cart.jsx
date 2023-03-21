import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], // Inicializa o state com uma lista vazia de produtos
    };
  }

  componentDidMount() {
    this.shoppingCart();
  }

  shoppingCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ products: cart });
  };

  render() {
    const { products } = this.state;
    return (
      <>
        { products.length === 0 ? (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>
        ) : (products.map((product, index) => (
          <li key={ index }>
            <h3 data-testid="shopping-cart-product-name">{ product.name }</h3>
            <img src={ product.image } alt={ product.name } />
            <h3>
              R$
              {product.value}
            </h3>
            <h3 data-testid="shopping-cart-product-quantity">{ product.qt }</h3>
          </li>
        ))
        )}
        ;
      </>
    );
  }
}

export default Cart;
