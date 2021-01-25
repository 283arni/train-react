import {combineReducers} from "redux";
import {reducerQuiz} from "./quiz";
import {creatorReducer} from "./creator";
import {authReducer} from "./auth";

const rootReducer = combineReducers({
  quiz: reducerQuiz,
  creator: creatorReducer,
  auth: authReducer
})

export default rootReducer;
