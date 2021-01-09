import {Component} from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinichedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    answerClasses: null,
    results: {},
    activeQuestionId: 1,
    quiz: [
      {
        question: 'Какой цвет я загадал?',
        correctAnswerId: 1,
        questionId: 1,
        answers: [
          {
            text: 'Синий',
            id: 1
          },
          {
            text: 'Красный',
            id: 2
          },
          {
            text: 'Черный',
            id: 3
          },
          {
            text: 'Белый',
            id: 4
          },
        ]
      },
      {
        question: 'Сколько глаз у человека?',
        correctAnswerId: 2,
        questionId: 2,
        answers: [
          {
            text: '1',
            id: 1
          },
          {
            text: '2',
            id: 2
          },
          {
            text: '3',
            id: 3
          },
          {
            text: '4',
            id: 4
          },
        ]
      }
    ]
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

    const answer = this.state.quiz[this.state.activeQuestionId - 1].correctAnswerId === id ? 'current' : 'error'
    const results = this.state.results;
    results[this.state.activeQuestionId] = answer

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

  render() {
    return (
      <div className={classes.Quiz}>
        <h1>Ответить на вопросы</h1>
        {this.state.quiz.length + 1 <= this.state.activeQuestionId ?
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
