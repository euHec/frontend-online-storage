import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], // Inicializa o state com uma lista vazia de produtos
    };
  }

  render() {
    const { products } = this.state;
    const cartEmpty = products.length === 0;

    return (
      <div>
        <h1>Carrinho de compras</h1>
        {cartEmpty ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <div>
            <p>Lista de produtos:</p>
            <ul>
              {/* Aqui podemos renderizar a logica para a lista de produtos */}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
