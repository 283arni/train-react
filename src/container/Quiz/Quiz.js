import {Component} from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinichedQuiz/FinishedQuiz";
import Loading from "../../components/Loading/Loading";
import {connect} from "react-redux";
import {getCurrentQuiz, onAnswerClick, onResetClick} from "../../redux/actions/quiz";

class Quiz extends Component {

  componentDidMount() {
    this.props.getCurrentQuiz(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.onResetClick()
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
              onResetClick={this.props.onResetClick}
            />
            :
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestionId - 1].answers}
              question={this.props.quiz[this.props.activeQuestionId - 1].question}
              onAnswerClick={this.props.onAnswerClick}
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
  getCurrentQuiz: (id) => dispatch(getCurrentQuiz(id)),
  onAnswerClick: (id) => dispatch(onAnswerClick(id)),
  onResetClick: () => dispatch(onResetClick())
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
