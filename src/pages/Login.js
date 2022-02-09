import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonOk: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { saveUser, history } = this.props;
    saveUser({ email, password });
    history.push('/carteira');
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const VALIDATION = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
      const SIX = 6;
      this.setState(({ password, email }) => ({
        isButtonOk: VALIDATION.test(email) && password.length >= SIX,
      }));
    });
  }

  render() {
    const { email, password, isButtonOk } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              id="email-input"
              value={ email }
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              id="password-input"
              value={ password }
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ !isButtonOk }
            onClick={ this.onClickButton }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  saveUser: PropTypes.func,
  push: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveUser: (payload) => dispatch(loginAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
