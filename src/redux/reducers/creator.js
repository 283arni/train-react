import {ActionQuizType} from "../actions/actionTypes";

const initialState = {
  quiz: []
}

export const creatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionQuizType.RESET_QUIZ:
      return {
        ...state,
        quiz: []
      }
    case ActionQuizType.CREATE_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.payload]
      }
    default:
      return state
  }
}