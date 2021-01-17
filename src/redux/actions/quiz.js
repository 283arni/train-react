import {ActionQuizType} from './actionTypes'

export const getQuiz = () => {
  return async dispatch => {
    dispatch(fetchStart())

    try {
      const data = await fetch('https://quiz-49026-default-rtdb.europe-west1.firebasedatabase.app/quiz.json')
        .then((response) => response.json())

      const quizServer = []

      Object.keys(data).forEach((key, index) => {
        quizServer.push({
          id: key,
          name: `Тест № ${index + 1}`
        })
      })

      dispatch(fetchSuccess(quizServer))
    } catch (error) {
      dispatch(fetchError(error))
    }
  }
}

export const getCurrentQuiz = (id) => {
  return async dispatch => {
    dispatch(fetchStart())

    try {
      const data = await fetch(`https://quiz-49026-default-rtdb.europe-west1.firebasedatabase.app/quiz/${id}.json`)
        .then((response) => response.json())

      console.log(data)
      dispatch(fetchSuccessToId(data))
    } catch(error) {
      dispatch(fetchError(error))
    }
  }
}

const fetchStart = () => ({
  type: ActionQuizType.ACTION_QUIZ_START
})

const fetchSuccess = (quiz) => ({
  type: ActionQuizType.ACTION_QUIZ_SUCCESS,
  payload: quiz
})

const fetchSuccessToId = (test) => ({
  type: ActionQuizType.ACTION_QUIZ_SUCCESS_ID,
  payload: test
})

const fetchError = (error) => ({
  type: ActionQuizType.ACTION_QUIZ_ERROR,
  payload: error
})