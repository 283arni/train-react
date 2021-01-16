import {Component} from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinichedQuiz/FinishedQuiz";
import Loading from "../../components/Loading/Loading";

class Quiz extends Component {
  state = {
    loading: true,
    answerClasses: null,
    results: {},
    activeQuestionId: 1,
    quiz: []
  }

  handlerResetClick = () => {
    this.setState({
      answerClasses: null,
      results: {},
      activeQuestionId: 1,
    })
  }

  handlerAnswerClick = (id) => {
    if (this.state.answerClasses && this.state.answerClasses[id] === 'current') {
      return;
    }
    const answer = +this.state.quiz[this.state.activeQuestionId - 1].correctAnswerId === id ? 'current' : 'error'
    const results = this.state.results;
    results[this.state.activeQuestionId] = answer

    console.log(this.state.results)
    this.setState({
      answerClasses: {
        [id]: answer
      },
      results
    })

    const timer = setTimeout(() => {
      this.setState({
        activeQuestionId: this.state.activeQuestionId + 1,
        answerClasses: null
      })

      clearTimeout(timer)
    }, 1000)
  }

  async componentDidMount() {
    try {
      const data = await fetch(`https://quiz-49026-default-rtdb.europe-west1.firebasedatabase.app/quiz/${this.props.match.params.id}.json`)
        .then((response) => response.json())


      this.setState({
        quiz: data,
        loading: false
      })
    } catch(err) {
      console.log(err)
    }

  }

  render() {
    return (
      <div className={classes.Quiz}>
        <h1>Ответить на вопросы</h1>
        {
          this.state.loading ?
          <Loading/> :
          this.state.quiz.length + 1 <= this.state.activeQuestionId ?
            <FinishedQuiz
              quizLength={this.state.quiz.length}
              quiz={this.state.quiz}
              results={this.state.results}
              onResetClick={this.handlerResetClick}
            />
            :
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestionId - 1].answers}
              question={this.state.quiz[this.state.activeQuestionId - 1].question}
              onAnswerClick={this.handlerAnswerClick}
              activeQuestion={this.state.activeQuestionId}
              quizLength={this.state.quiz.length}
              answerClasses={this.state.answerClasses}
            />
        }

      </div>
    )
  }
}

export default Quiz;
