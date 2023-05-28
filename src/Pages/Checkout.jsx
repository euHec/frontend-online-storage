import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Checkout extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState(() => ({ products: storage }));
  }

  render() {
    const { history } = this.props;
    const { products } = this.state;
    return (
      <>
        <button onClick={ () => history.push('/cart') }>
          retornar
        </button>
        <div>
          <div>
            <h1>revise seus produtos</h1>
            <div>
              {
                products.map((product, index) => (
                  <div key={ index }>
                    <h3 data-testid="shopping-cart-product-name">{ product.name }</h3>
                    <img src={ product.image } alt={ product.name } />
                    <h3>{`Quantidade ${product.qt}`}</h3>
                    <h3>{`R$ ${product.value * product.qt}`}</h3>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
