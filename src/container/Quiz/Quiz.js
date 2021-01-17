import {Component} from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinichedQuiz/FinishedQuiz";
import Loading from "../../components/Loading/Loading";
import {connect} from "react-redux";
import {getCurrentQuiz} from "../../redux/actions/quiz";

class Quiz extends Component {
  // state = {
  //   loading: true,
  //   answerClasses: null,
  //   results: {},
  //   activeQuestionId: 1,
  //   quiz: []
  // }

  handlerResetClick = () => {
    this.setState({
      answerClasses: null,
      results: {},
      activeQuestionId: 1,
    })
  }

  handlerAnswerClick = (id) => {
    if (this.props.answerClasses && this.props.answerClasses[id] === 'current') {
      return;
    }
    const answer = +this.props.quiz[this.props.activeQuestionId - 1].correctAnswerId === id ? 'current' : 'error'
    const results = this.props.results;
    results[this.props.activeQuestionId] = answer

    this.setState({
      answerClasses: {
        [id]: answer
      },
      results
    })

    const timer = setTimeout(() => {
      this.setState({
        activeQuestionId: this.props.activeQuestionId + 1,
        answerClasses: null
      })

      clearTimeout(timer)
    }, 1000)
  }

  componentDidMount() {
    this.props.getCurrentQuiz(this.props.match.params.id)
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <h1>Ответить на вопросы</h1>
        {
          this.props.loading ?
          <Loading/> :
          this.props.quiz.length + 1 <= this.props.activeQuestionId ?
            <FinishedQuiz
              quizLength={this.props.quiz.length}
              quiz={this.props.quiz}
              results={this.props.results}
              onResetClick={this.handlerResetClick}
            />
            :
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestionId - 1].answers}
              question={this.props.quiz[this.props.activeQuestionId - 1].question}
              onAnswerClick={this.handlerAnswerClick}
              activeQuestion={this.props.activeQuestionId}
              quizLength={this.props.quiz.length}
              answerClasses={this.props.answerClasses}
            />
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    loading: state.quiz.loading,
    answerClasses: state.quiz.answerClasses,
    results: state.quiz.results,
    activeQuestionId: state.quiz.activeQuestionId,
    quiz: state.quiz.quiz
})

const mapDispatchToProps = (dispatch) => ({
  getCurrentQuiz: (id) => dispatch(getCurrentQuiz(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
