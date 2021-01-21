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

export const onAnswerClick = (id) => {
  return (dispatch, getState) => {

    const state = getState().quiz

    if (state.answerClasses && state.answerClasses[id] === 'current') {
      return;
    }
    const answer = +state.quiz[state.activeQuestionId - 1].correctAnswerId === id ? 'current' : 'error'
    const results = state.results;

    results[state.activeQuestionId] = answer

    dispatch(fetchAnswer({
          [id]: answer
        }, results))

    const timer = setTimeout(() => {
      dispatch(fetchNextStep(state.activeQuestionId, null))

      clearTimeout(timer)
    }, 1000)
  }
}

export const onResetClick = () => {
  return (dispatch) => {
    dispatch(fetchReset())
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

const fetchAnswer = (answerClass, results) => ({
  type: ActionQuizType.ANSWER_QUIZ,
  payload: answerClass,
  results
})

const fetchNextStep = (id, answerClasses) => ({
  type: ActionQuizType.ANSWER_NEXT_STEP,
  payload: id,
  answerClasses
})

const fetchReset = () => ({
  type:ActionQuizType.RESET_QUIZ
})