import {ActionQuizType} from "./actionTypes";


export const auth = (email, password, isLogin) => {
  return async (dispatch) => {
    const bodyApi = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAumffZq-Y6oK0Iu0JfZBJ0awzhYVl57ec'

    if(!isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAumffZq-Y6oK0Iu0JfZBJ0awzhYVl57ec'
    }

    const response = await fetch(url, {method: "POST", body: JSON.stringify(bodyApi)})
      .then((response) => response.json())

    const logoutDate = new Date(new Date().getTime() + response.expiresIn * 1000)

    localStorage.setItem('token', response.idToken)
    localStorage.setItem('userId', response.localId)
    localStorage.setItem('logoutDate', logoutDate)

    dispatch(authSuccess(response.idToken))
    dispatch(authBreak(response.expiresIn))
  }
}

const authBreak = (logoutDate) => {
  return dispatch => {
    setTimeout(() => dispatch(logout()), logoutDate * 1000)
  }
}

export const autoLogin = () => {

  return dispatch => {
    const token = localStorage.getItem('token');

    if (token) {
      const logoutDate = new Date(localStorage.getItem('logoutDate'))

      if (logoutDate <= new Date().getTime()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(authBreak((logoutDate.getTime() - new Date().getTime()) / 1000))
      }
    } else {
      dispatch(logout())
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('logoutDate')

  return {
    type: ActionQuizType.AUTH_BREAK
  }
}

const authSuccess = (token) => {
  return {
    type: ActionQuizType.AUTH_SUCCESS,
    payload: token
  }
}