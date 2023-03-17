import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    search: '',
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
    console.log(results);
    this.setState({ products: results });
  };

  render() {
    const { search, products } = this.state;
    const UNDEFINED = <span>Nenhum produto foi encontrato</span>;
    console.log(products);
    return (
      <>
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
          { !search
            && (
              <span data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </span>
            )}
          {/* {
            products === undefined ? UNDEFINED : (
              <span> produtos </span>
            )
          } */}
        </div>
      </>
    );
  }
}

export default Home;
