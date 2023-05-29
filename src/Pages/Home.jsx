import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Card from '../Components/Card';
import './Home.css';
import ListCategories from '../Components/ListCategories';

class Home extends Component {
  state = {
    search: '',
    size: 0,
    validate: false, // validação para apagar texto da tela
    undefine: false, // validção para imprimir o texto de não encontrado
    products: [],
    listOfCategories: [],
  };

  // chamando a função categories após o carregamento da tela
  componentDidMount() {
    this.categories();
    const lengthCart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState(() => ({ size: lengthCart.length }));
  }

  // Função responsável pela requisição dos produtos da categoria selecionada
  getProductsByCategory = async (categoryId) => {
    const products = await getProductsFromCategoryAndQuery(categoryId, '');
    this.setState({ products: products.results, validate: true });
  };

  // Função responsável pela requisição feita na api
  categories = async () => {
    // declarando a constante nameCategorie onde ela armazena o retorno da getCategories
    const nameCategorie = await getCategories();

    // Alterando o estado listOfCategories onde ele recebe a const nameCategorie
    this.setState({
      listOfCategories: nameCategorie,
    });
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
    const response = await getProductsFromCategoryAndQuery('', search);
    console.log(response);
    const { results } = response;
    if (results.length === 0) this.setState({ undefine: true });
    this.setState({ products: results, validate: true });
  };

  addToCart = (product) => {
    const { title, thumbnail, price } = product;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: title, image: thumbnail, value: price, qt: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState(() => ({ size: cart.length }));
  };

  render() {
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
            {/* Link para o Cart */}
            <Link to="/cart" data-testid="shopping-cart-button">
              <AiOutlineShoppingCart />
              { size !== 0 && (
                <p data-testid="shopping-cart-size">{ size }</p>
              ) }
            </Link>
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

                  // troquei o fragment <> por uma div
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

export default Home;
