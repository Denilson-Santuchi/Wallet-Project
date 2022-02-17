import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Taxa de Conversão</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => (
            <tr
              key={ element.id }
            >
              <td>
                {element.description}
              </td>
              <td>
                {element.tag}
              </td>
              <td>
                {element.method}
              </td>
              <td>
                {Number(element.value).toFixed(2)}
              </td>
              <td>
                {element.currency}
              </td>
              <td>
                {
                  Number((element.exchangeRates[element.currency].ask)).toFixed(2)
                }
              </td>
              <td>
                {element.exchangeRates[element.currency].name}
              </td>
              <td>
                {
                  (element.exchangeRates[element.currency].ask
                   * element.value).toFixed(2)
                }
              </td>
              <td>
                Real
              </td>
              <td>
                <button
                  className="buttonDelete"
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.handleClick(element.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
