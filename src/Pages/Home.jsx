import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Card from '../Components/Card';
import ListCategories from '../Components/ListCategories';

class Home extends Component {
  state = {
    search: '',
    size: 0,
    validate: false,
    undefine: false,
    products: [],
    listOfCategories: [],
  };

  componentDidMount() {
    this.categories();
    const lengthCart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState(() => ({ size: lengthCart.length }));
  }

  getProductsByCategory = async (categoryId) => {
    const products = await getProductsFromCategoryAndQuery(categoryId, '');
    this.setState({ products: products.results, validate: true });
  };

  categories = async () => {
    const nameCategorie = await getCategories();
    this.setState({ listOfCategories: nameCategorie });
  };

  onInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  onSearchProduct = async (event) => {
    const { search } = this.state;
    event.preventDefault();
    const response = await getProductsFromCategoryAndQuery('', search);
    console.log(response);
    const { results } = response;
    if (results.length === 0) this.setState({ undefine: true });
    this.setState({ products: results, validate: true });
  };

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

  render() {
    const { history } = this.props;
    const { search, products, validate, listOfCategories, undefine, size } = this.state;
    const UNDEFINED = <span>Nenhum produto foi encontrado</span>;
    return (
      <>
        <div className="header">
          <div>
            <form onSubmit={ this.onSearchProduct }>
              <input
                type="text"
                value={ search }
                onChange={ this.onInputSearch }
                data-testid="query-input"
              />
              <button data-testid="query-button">
                buscar
              </button>
            </form>
          </div>
          <div>
            <button
              data-testid="shopping-cart-button"
              onClick={ () => history.push('/cart') }
            >
              <AiOutlineShoppingCart />
              { size !== 0 && (
                <p data-testid="shopping-cart-size">{ size }</p>
              ) }

            </button>
          </div>
        </div>
        <div>
          <div className="page-home">
            <div className="list-categories">
              { listOfCategories.map(({ id, name }) => (
                <ListCategories
                  key={ id }
                  listOfCategories={ name }
                  product={ products }
                  productsByCategory={ () => this.getProductsByCategory(id) }
                />))}
            </div>
            <div className="listOfProducts">
              { (!search && !validate)
                && (
                  <span data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </span>
                )}
              { undefine && UNDEFINED }
              { (products.length !== 0) && (
                products.map((product, index) => (
                  <div key={ index }>
                    <Card
                      details={ product }
                    />
                    <button
                      key={ index }
                      data-testid="product-add-to-cart"
                      onClick={ () => this.addToCart(product) }
                    >
                      Adicionar
                    </button>
                  </div>))
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Home;
