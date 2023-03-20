import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    product: {},
  };

  // Obtém o ID do produto, faz uma chamada à API e atualiza o estado do componente
  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;
    const response = await getProductById(productId);
    this.setState({ product: response });
  }

  render() {
    const { product } = this.state;

    return (
      <div>

        <h2>Detalhes do Produto</h2>

        {/* Imagem do produto */}
        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />

        {/* Descrição do produto */}
        <p data-testid="product-detail-name">
          Descrição:
          {' '}
          { product.title }
        </p>

        {/* Preço e moeda do produto */}
        <p data-testid="product-detail-price">
          Preço:
          {' '}
          { product.price }
          {' '}
          { product.currency_id }
        </p>

        {/* Link para o carrinho de compras */}
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho de Compras</Link>

      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
