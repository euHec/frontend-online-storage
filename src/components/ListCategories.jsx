import React, { Component } from 'react';
import { getCategories } from '../services/api';

class ListCategories extends Component {
  // iniciando o estado listOfCategories como um array vazio
  state = {
    listOfCategories: [],
  };

  // chamando a funão categories após o carregamento da tela
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

  render() {
    // chamando o estado
    const { listOfCategories } = this.state;
    return (
      <div>
        {/* Procurando o nome das categorias no array com o map */}
        { listOfCategories.map((categorie) => (
          <div key={ categorie.id }>
            <button type="button" data-testid="category">
              {categorie.name}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default ListCategories;
