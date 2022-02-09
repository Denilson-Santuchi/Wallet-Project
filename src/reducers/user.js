// Esse reducer será responsável por tratar as informações da pessoa usuária

import { USER_LOGIN } from '../actions/index';

const INTIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
    };
  default:
    return state;
  }
};

export default userReducer;
