import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../Components/Card';
import './Home.css';
import ListCategories from '../Components/ListCategories';

class Home extends Component {
  state = {
    search: '',
    validate: false,
    products: [],
  };

  // Função que cuida do preenchimento do atributo search no state
  onInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  // Função que é aciona uma chamada de API para listar os produtos
  onSearchProduct = async (event) => {
    const { search } = this.state;
    event.preventDefault();
    const response = await getProductsFromCategoryAndQuery(search);
    const { results } = response;
    this.setState({ products: results, validate: true });
  };

  render() {
    const { search, products, validate } = this.state;
    const UNDEFINED = <span>Nenhum produto foi encontrato</span>;
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
            {/* Link para o Cart */}
            <Link to="/cart" data-testid="shopping-cart-button">
              Carrinho de compras
            </Link>
          </div>
        </div>
        <div>
          <div className="page-home">
            <div className="list-categories">
              <ListCategories />
            </div>
            <div className="listOfProducts">
              { !search
                && (
                  <span data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </span>
                )}
              { validate && (
                products.length === 0 ? UNDEFINED : (
                  products.map((product) => (
                    <Card key={ product.id } details={ product } />))
                )
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
