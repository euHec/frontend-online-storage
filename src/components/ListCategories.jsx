import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class ListCategories extends Component {
  // iniciando o estado listOfCategories como um array vazio
  state = {
    listOfCategories: [],
    products: [],
  };

  // chamando a função categories após o carregamento da tela
  componentDidMount() {
    this.categories();
  }

  // Função responsável pela requisição feita na api
  categories = async () => {
    // declarando a constante nameCategorie onde ela armazena o retorno da getCategories
    const nameCategorie = await getCategories();

    // Alterando o estado listOfCategories onde ele recebe a const nameCategorie
    this.setState({
      listOfCategories: nameCategorie,
    });
  };

  // Função responsável pela requisição dos produtos da categoria selecionada
  getProductsByCategory = async (categoryId) => {
    const products = await getProductsFromCategoryAndQuery(categoryId, '');
    this.setState({ products: products.results });
  };

  render() {
    // chamando o estado
    const { listOfCategories, products } = this.state;

    return (
      <div>
        {/* Procurando o nome das categorias no array com o map */}
        { listOfCategories.map((categorie) => (
          <div key={ categorie.id }>
            <button
              type="button"
              data-testid="category"
              onClick={ () => this.getProductsByCategory(categorie.id) }
            >
              {categorie.name}
            </button>
          </div>
        ))}

        {/* Renderiza os produtos obtidos da API */}
        {products.length > 0 && (
          <div>
            <h2>Produtos</h2>
            <ul>
              {products.map((product) => (
                <li key={ product.id } data-testid="product">
                  <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default ListCategories;

// //
