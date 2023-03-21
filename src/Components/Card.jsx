import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { details } = this.props;
    const { title, thumbnail, price, id } = details;
    return (
      <div data-testid="product" className="product">
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
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default Card;
