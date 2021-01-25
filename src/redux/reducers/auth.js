import {ActionQuizType} from "../actions/actionTypes";

const initialState = {
  token: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionQuizType.AUTH_SUCCESS:
      return  {
        ...state,
        token: action.payload
      }
    case ActionQuizType.AUTH_BREAK:
      return  {
        ...state,
        token: null
      }
    default:
      return state
  }
}