// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  CURRENCY_SUCCESS,
  CURRENCY_ERROR,
  USER_EXPENSES,
  BUTTON_DELETE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case CURRENCY_ERROR:
    return state;
  case USER_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case BUTTON_DELETE:
    return {
      ...state,
      expenses: [...action.array],
    };
  default:
    return state;
  }
};

export default walletReducer;
