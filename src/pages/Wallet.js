import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { currencyThunk, expensesAction } from '../actions';
import currencyApi from '../services/currencyApi';
import Table from '../components/Table';

const defaultValues = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: [],
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: defaultValues.value,
      description: defaultValues.description,
      currency: defaultValues.currency,
      method: defaultValues.method,
      tag: defaultValues.tag,
      id: 0,
      exchangeRates: defaultValues.exchangeRates,
      coins: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    currencyApi().then((data) => {
      delete data.USDT;
      this.setState({ exchangeRates: data, coins: Object.keys(data) });
    });
  }

  handleClick(event) {
    event.preventDefault();
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    const { expensesProp, currenciesProp } = this.props;
    currenciesProp();
    expensesProp(
      {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      },
    );
    this.setState({
      id: id + 1,
      value: defaultValues.value,
      description: defaultValues.description,
      currency: defaultValues.currency,
      method: defaultValues.method,
      tag: defaultValues.tag,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      coins,
    } = this.state;

    return (
      <>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="number"
              id="value-input"
              data-testid="value-input"
              value={ value }
              name="value"
              onChange={ this.handleChange }
            />
          </label>
          Descrição:
          <label htmlFor="description-input">
            <input
              type="text"
              id="description-input"
              data-testid="description-input"
              value={ description }
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
              value={ currency }
              name="currency"
              onChange={ this.handleChange }
            >
              {
                coins.map((moeda) => (
                  <option key={ moeda } value={ moeda } data-testid={ moeda }>
                    {moeda}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            Metódo de pagamento
            <select
              id="method-input"
              data-testid="method-input"
              value={ method }
              name="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              id="tag-input"
              data-testid="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <button
              type="submit"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </label>
        </form>
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  currenciesProp: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesProp: () => dispatch(currencyThunk()),
  expensesProp: (payload) => dispatch(expensesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
