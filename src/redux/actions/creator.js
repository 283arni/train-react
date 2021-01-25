import {ActionQuizType} from "./actionTypes";

export const createTest = () => {
  return async (dispatch, getState) => {
    try {
      await fetch('https://quiz-49026-default-rtdb.europe-west1.firebasedatabase.app/quiz.json',{method: 'POST', body: JSON.stringify(getState().creator.quiz)})
      dispatch(resetQuiz())
    } catch (error) {
      console.log(error)
    }
  }
}

export const createQuestion = (item) => {
  return {
    type: ActionQuizType.CREATE_QUESTION,
    payload: item
  }
}

const resetQuiz = () => {
  return {
    type: ActionQuizType.RESET_QUIZ
  }
}
