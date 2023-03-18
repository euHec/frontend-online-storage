import React, { Component } from 'react';
import ListCategories from '../components/ListCategories';

class Home extends Component {
  state = {
    search: '',
  };

  onInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  render() {
    const { search } = this.state;
    return (
      <>
        <input
          type="text"
          value={ search }
          onChange={ this.onInputSearch }
        />

        { !search
          && (
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          )}
        {/* Renderização da lista na página principal */}
        <ListCategories />
      </>
    );
  }
}

export default Home;
