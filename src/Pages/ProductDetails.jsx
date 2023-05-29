import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RxCaretLeft } from 'react-icons/rx';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getProductById } from '../services/api';

const ratingValues = ['1', '2', '3', '4', '5'];

export default class ProductDetails extends Component {
  state = {
    size: 0,
    product: {},
    review: {
      email: '',
      rating: 0,
      text: '',
    },
    reviews: [],
    error: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;
    const response = await getProductById(productId);
    const reviews = JSON.parse(localStorage.getItem(`${productId}`)) || [];
    const lengthCart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ product: response, reviews, size: lengthCart.length });
  }

  addToCart = (product) => {
    // eslint-disable-next-line camelcase
    const { title, thumbnail, price, available_quantity } = product;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exist = cart.some((item) => item.name === title);
    if (exist) {
      const newArray = cart.map((item) => {
        if (item.name === title) {
          return { ...item, qt: item.qt + 1 };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newArray));
      this.setState(() => ({ size: newArray.length }));
    } else {
      cart.push({
        name: title,
        image: thumbnail,
        value: price,
        qt: 1,
        // eslint-disable-next-line camelcase
        estoque: available_quantity,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      this.setState(() => ({ size: cart.length }));
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      review: {
        ...prevState.review,
        [name]: value,
      },
    }));
  };

  handleSubmitReview = (event) => {
    event.preventDefault();
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;
    const { review: { email, text, rating } } = this.state;

    if (!email || !rating) {
      this.setState({ error: true });
      return;
    }

    const newReview = { email, text, rating };
    this.setState((prevState) => {
      const newReviews = [...prevState.reviews, newReview];
      localStorage.setItem(`${productId}`, JSON.stringify(newReviews));
      return {
        reviews: newReviews,
        review: {
          email: '',
          text: '',
          rating: 0,
        },
        error: false, // resetando o estado error para false
      };
    });
  };

  render() {
    const { product } = this.state;
    const { review } = this.state;
    const { email, rating, text } = review;
    const { size, reviews, error } = this.state;
    const { history } = this.props;
    return (
      <div>

        <button onClick={ () => history.push('/') }>
          <RxCaretLeft />
        </button>

        <h2>Detalhes do Produto</h2>
        {
          product?.shipping?.free_shipping && (
            <span data-testid="free-shipping">Frete grátis</span>
          )
        }
        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />

        <p data-testid="product-detail-name">
          Descrição:
          {' '}
          { product.title }
        </p>

        <p data-testid="product-detail-price">
          Preço:
          {' '}
          { product.price }
          {' '}
          { product.currency_id }
        </p>

        <button
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          <AiOutlineShoppingCart />
          { size !== 0 && (
            <p data-testid="shopping-cart-size">{ size }</p>
          ) }
        </button>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(product) }
        >
          Adicionar
        </button>

        <form onSubmit={ this.handleSubmitReview }>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleInputChange }
              data-testid="product-detail-email"
            />
          </label>
          <div>
            Avaliação:
            {ratingValues.map((index) => (
              <label key={ index }>
                <input
                  type="radio"
                  name="rating"
                  value={ index }
                  checked={ rating === index }
                  onChange={ this.handleInputChange }
                  data-testid={ `${index}-rating` }
                />
                {index}
              </label>
            ))}
          </div>

          <label htmlFor="text">
            Comentário:
            <textarea
              id="text"
              name="text"
              value={ text }
              onChange={ this.handleInputChange }
              data-testid="product-detail-evaluation"
            />

          </label>
          {error && <p data-testid="error-msg">Campos inválidos</p>}
          <button type="submit" data-testid="submit-review-btn">
            Enviar Avaliação
          </button>

        </form>

        <div>
          {reviews.map((currentReview, index) => (
            <div key={ index }>
              <p>
                Email:
                <span data-testid="review-card-email">
                  { currentReview.email}
                </span>
              </p>
              <p>
                Avaliação:
                <span data-testid="review-card-rating">
                  { currentReview.rating}
                </span>
              </p>
              <p>
                Comentário:
                <span data-testid="review-card-evaluation">
                  { currentReview.text}
                </span>
              </p>
              <br />

            </div>

          ))}
        </div>

      </div>
    );
  }
}

ProductDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
