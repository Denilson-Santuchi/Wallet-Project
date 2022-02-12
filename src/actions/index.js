// Coloque aqui suas actions
import currencyApi from '../services/currencyApi';

export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_SUCCESS = 'CURRENCY_SUCCESS';
export const CURRENCY_ERROR = 'CURRENCY_ERROR';
export const USER_EXPENSES = 'USER_EXPENSES';

export const loginAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const currencySuccess = (payload) => ({
  type: CURRENCY_SUCCESS,
  payload,
});

export const currencyError = () => ({
  type: CURRENCY_ERROR,
});

export const expensesAction = (payload) => ({
  type: USER_EXPENSES,
  payload,
});

export function currencyThunk() {
  return async (dispatch) => {
    try {
      const currencies = await currencyApi();
      delete currencies.USDT;
      dispatch(currencySuccess(currencies));
    } catch (error) {
      dispatch(currencyError());
    }
  };
}
