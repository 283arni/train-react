import {ActionQuizType} from "../actions/actionTypes";

const initialState = {
  quizServer: [],
  loading: false,
  errorText: null,
  answerClasses: null,
  results: {},
  activeQuestionId: 1,
  quiz: []
}

export const reducerQuiz = (state = initialState, action) => {
  switch (action.type) {
    case ActionQuizType.ACTION_QUIZ_START:
      return {
        ...state,
        loading: true
      }
    case ActionQuizType.ACTION_QUIZ_SUCCESS:
      return {
        ...state,
        quizServer: action.payload,
        loading: false
      }
    case ActionQuizType.ACTION_QUIZ_SUCCESS_ID:
      return {
        ...state,
        quiz: action.payload,
        loading: false
      }
    case ActionQuizType.ACTION_QUIZ_ERROR:
      return {
        ...state,
        errorText: action.payload,
        loading: false
      }
    case ActionQuizType.ANSWER_QUIZ:
      return {
        ...state,
        answerClasses: action.payload,
        results: action.results
      }
    case ActionQuizType.ANSWER_NEXT_STEP:
      return {
        ...state,
        answerClasses: action.answerClasses,
        activeQuestionId: action.payload + 1
      }
    case ActionQuizType.RESET_QUIZ:
      return {
        ...state,
        answerClasses: null,
        results: {},
        activeQuestionId: 1,
      }
    default:
      return state
  }
}
