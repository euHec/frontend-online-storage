import React, { Component } from 'react';

class ListCategories extends Component {
  render() {
    // chamando o estado
    const { listOfCategories, productsByCategory } = this.props;
    return (
      <div>
        {/* Procurando o nome das categorias no array com o map */}
        <button
          type="button"
          data-testid="category"
          onClick={ productsByCategory }
        >
          {listOfCategories}
        </button>
      </div>
    );
  }
}

export default ListCategories;
