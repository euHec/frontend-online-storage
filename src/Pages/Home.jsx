import React, { Component } from 'react';

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
      </>
    );
  }
}

export default Home;
