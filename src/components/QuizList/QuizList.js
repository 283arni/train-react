import {NavLink} from 'react-router-dom'
import {Component} from 'react'
import Loading from "../Loading/Loading";
import classes from './QuizList.module.css'



class QuizList extends Component {
  state = {
    loading: true,
    quizServer: []
  }

  renderQuiz = () => {
    return this.state.quizServer.map((quiz) => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink
            to={`/quiz/${quiz.id}`}
          >
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
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


      this.setState({
        quizServer,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>Список вопросов</h1>
        {
          this.state.loading ?
            <Loading/>
            :
            null
        }

        <ul>
          {this.renderQuiz()}
        </ul>
      </div>
    )
  }
}

export default  QuizList;
