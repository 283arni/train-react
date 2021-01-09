import {NavLink} from 'react-router-dom'
import classes from './QuizList.module.css'

const createLink = () => {
  return [1, 2, 3].map((link) => {
    return (
      <li
        key={link}
      >
        <NavLink
          to={`/quiz/${link}`}
        >
          Вопрос {link}
        </NavLink>
      </li>
    )
  })
}

const QuizList = () => {
  return (
    <div className={classes.QuizList}>
      <h1>Список вопросов</h1>
      <ul>
        {createLink()}
      </ul>
    </div>
  )
}

export default  QuizList;