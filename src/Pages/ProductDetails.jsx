import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

const ratingValues = ['1', '2', '3', '4', '5'];

class ProductDetails extends Component {
  state = {
    product: {},
    review: {
      email: '',
      rating: 0,
      text: '',
    },
    reviews: [],
    error: false,
  };

  // Obtém o ID do produto, faz uma chamada à API e atualiza o estado do componente
  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;
    const response = await getProductById(productId);
    const reviews = JSON.parse(localStorage.getItem(`${productId}`))
    || [];
    this.setState({ product: response, reviews });
  }

  addToCart = (product) => {
    console.log(product);
    const { title, thumbnail, price } = product;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: title, image: thumbnail, value: price, qt: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
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

    // validação dos campos
    if (!email || !rating) {
      this.setState({ error: true }); // atualizando o estado error
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
    const { reviews, error } = this.state;

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
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(product) }
        >
          Adicionar
        </button>

        {/* Form */}
        <form onSubmit={ this.handleSubmitReview }>

          {/* Email */}
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

          {/* Nota de avaliação */}
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

          {/* Input de Comentários */}
          <label htmlFor="text">
            Comentário:
            <textarea
              id="text"
              name="text"
              value={ text }
              onChange={ this.handleInputChange }
              data-testid="product-detail-evaluation"
            />

            {/* Botão Submit */}
          </label>
          {error && <p data-testid="error-msg">Campos inválidos</p>}
          {/* exibindo mensagem de erro caso o estado error seja true */}
          <button type="submit" data-testid="submit-review-btn">
            Enviar Avaliação
          </button>

        </form>

        {/* Review criado após dar submit no botão */}
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
              {/* remover o <br> depois */}
              <br />

            </div>

          ))}
        </div>

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

// ok
