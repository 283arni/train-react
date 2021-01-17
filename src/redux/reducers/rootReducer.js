import {combineReducers} from "redux";
import {reducerQuiz} from "./quiz";

const rootReducer = combineReducers({
  quiz: reducerQuiz
})

export default rootReducer;
