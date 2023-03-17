import React, { Component } from 'react';

class Home extends Component {
  state = {
    search: '',
    // products: [],
  };

  onInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  render() {
    const { search } = this.state;
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
        </div>
      </>
    );
  }
}

export default Home;
