import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends Component {
  render() {
    const { details } = this.props;
    const { title, thumbnail, price } = details;
    return (
      <div data-testid="product" className="product">
        {/* < Link to={`/product/${id}`}/> */}
        <div>
          <span>{title}</span>
        </div>
        <div>
          <img src={ thumbnail } alt={ title } />
        </div>
        <div>
          <span>{price}</span>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  details: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Card;
