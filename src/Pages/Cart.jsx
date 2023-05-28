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

  addQuantity = ({ name }) => {
    this.setState((prevState) => {
      const { products } = prevState;
      return {
        products: products.map((item) => {
          if (item.name === name) {
            return { ...item, qt: item.qt + 1 };
          }
          return item;
        }),
      };
    });
  };

  removeQuantity = ({ name }) => {
    this.setState((prevState) => {
      const { products } = prevState;
      return {
        products: products.map((item) => {
          if (item.name === name) {
            if (item.qt === 1) {
              return { ...item, qt: 1 };
            }
            return { ...item, qt: item.qt - 1 };
          }
          return item;
        }),
      };
    });
  };

  removeItem = ({ name }) => {
    const { products } = this.state;
    const newListProducts = products.filter((item) => item.name !== name);
    this.setState(() => ({ products: newListProducts }));
  };

  render() {
    const { products } = this.state;
    return (
      products.length === 0 ? (
        <h3 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h3>
      ) : (
        products.map((product, index) => (
          <div key={ index }>
            <h3 data-testid="shopping-cart-product-name">{ product.name }</h3>
            <img src={ product.image } alt={ product.name } />
            <h3>{`R$ ${product.value * product.qt}`}</h3>
            <button
              data-testid="remove-product"
              onClick={ () => this.removeItem(product) }
            >
              x
            </button>
            <button
              data-testid="product-increase-quantity"
              onClick={ () => this.addQuantity(product) }
            >
              +
            </button>
            <h3 data-testid="shopping-cart-product-quantity">{ product.qt }</h3>
            <button
              data-testid="product-decrease-quantity"
              onClick={ () => this.removeQuantity(product) }
            >
              -
            </button>
          </div>
        ))
      )
    );
  }
}

export default Cart;
