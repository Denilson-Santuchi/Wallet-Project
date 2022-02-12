import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.allExpenses = this.allExpenses.bind(this);
  }

  allExpenses() {
    const { expenses } = this.props;
    let headerSum = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      headerSum += value * exchangeRates[currency].ask;
    });
    return headerSum;
  }

  render() {
    const { userEmail } = this.props;
    console.log(expenses);
    return (
      <header>
        <h3 data-testid="email-field">
          Login:
          {userEmail}
        </h3>
        <h3 data-testid="total-field">
          { this.allExpenses().toFixed(2) }
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
