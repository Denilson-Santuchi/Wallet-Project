// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { CURRENCY_SUCCESS, CURRENCY_ERROR } from '../actions';

const INITIAL_STATE = {
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
  default:
    return state;
  }
};

export default walletReducer;
