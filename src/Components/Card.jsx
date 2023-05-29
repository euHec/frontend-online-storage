import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { details } = this.props;
    console.log(details);
    const { title, thumbnail, price, id, shipping } = details;
    return (
      <div data-testid="product" className="product">
        {
          shipping.free_shipping && (
            <span data-testid="free-shipping">Frete grátis</span>
          )
        }
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <div>
            <span>{title}</span>
          </div>
          <div>
            <img src={ thumbnail } alt={ title } />
          </div>
          <div>
            <span>{ price }</span>
          </div>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default Card;
