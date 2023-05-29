import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Checkout extends Component {
  state = {
    products: [],
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    address: '',
    method: '',
    errorMessage: false,
  };

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState(() => ({ products: storage }));
  }

  handleChanges = ({ target }) => {
    this.setState(() => ({
      [target.name]: target.value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { cep, cpf, email, address, name, phone } = this.state;
    if (
      cep === '' && cpf === ''
      && email === '' && address === ''
      && name === '' && phone === ''
    ) {
      this.setState(() => ({ errorMessage: true }));
    } else {
      this.setState(() => ({ errorMessage: false }));
    }
  };

  render() {
    const { history } = this.props;
    const { products, cep, cpf, email, address, name, phone, errorMessage } = this.state;
    return (
      <>
        <button onClick={ () => history.push('/cart') }>
          retornar
        </button>
        <div>
          <div>
            <h1>revise seus produtos</h1>
            <div>
              {
                products.map((product, index) => (
                  <div key={ index }>
                    <h3 data-testid="shopping-cart-product-name">{ product.name }</h3>
                    <img src={ product.image } alt={ product.name } />
                    <h3>{`Quantidade ${product.qt}`}</h3>
                    <h3>{`R$ ${product.value * product.qt}`}</h3>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div>
          <h1>Informações do comprador</h1>
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <input
              type="text"
              placeholder="Nome completo"
              name="name"
              onChange={ this.handleChanges }
              value={ name }
              data-testid="checkout-fullname"
            />
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              onChange={ this.handleChanges }
              value={ email }
              data-testid="checkout-email"
            />
            <input
              type="number"
              placeholder="CPF"
              name="cpf"
              onChange={ this.handleChanges }
              value={ cpf }
              data-testid="checkout-cpf"
            />
            <input
              type="tel"
              placeholder="Telefone"
              name="phone"
              onChange={ this.handleChanges }
              value={ phone }
              data-testid="checkout-phone"
            />
            <input
              type="number"
              placeholder="CEP"
              name="cep"
              onChange={ this.handleChanges }
              value={ cep }
              data-testid="checkout-cep"
            />
            <input
              type="text"
              placeholder="Endereço"
              name="address"
              onChange={ this.handleChanges }
              value={ address }
              data-testid="checkout-address"
            />
            <input
              type="submit"
              value="Finalizar compra"
              data-testid="checkout-btn"
            />
            {
              errorMessage === true && (
                <p data-testid="error-msg">Preencha todos os campos</p>
              )
            }
          </form>
          <div>
            <label htmlFor="boleto">Boleto</label>
            <input
              type="radio"
              onChange={ this.handleChanges }
              value="Boleto"
              name="method"
              data-testid="ticket-payment"
              id="boleto"
            />
            <label htmlFor="visa">Visa</label>
            <input
              type="radio"
              onChange={ this.handleChanges }
              value="Visa"
              name="method"
              data-testid="visa-payment"
              id="visa"
            />
            <label htmlFor="mastercard">MasterCard</label>
            <input
              type="radio"
              onChange={ this.handleChanges }
              value="MasterCard"
              name="method"
              data-testid="master-payment"
              id="mastercard"
            />
            <label htmlFor="elo">Elo</label>
            <input
              type="radio"
              onChange={ this.handleChanges }
              value="Elo"
              name="method"
              data-testid="elo-payment"
              id="elo"
            />
          </div>
        </div>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
