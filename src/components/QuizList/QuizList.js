import {NavLink} from 'react-router-dom'
import {Component} from 'react'
import {connect} from 'react-redux'
import Loading from "../Loading/Loading";
import classes from './QuizList.module.css'
import {getQuiz} from "../../redux/actions/quiz";


class QuizList extends Component {
  renderQuiz = () => {
    return this.props.quizServer.map((quiz) => {
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
    this.props.getQuiz()
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>Список вопросов</h1>
        {
          this.props.loading ?
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

const mapStateToProps = (state) => ({
  quizServer: state.quiz.quizServer,
  loading: state.quiz.loading
})

const mapDispatchToProps = (dispatch) => ({
  getQuiz: () => dispatch(getQuiz())
})

export default  connect(mapStateToProps, mapDispatchToProps)(QuizList);
