import classes from './ActiveQuiz.module.css';
import AnswersList from "../AnswersList/AnswersList";

const ActiveQuiz = (props) => {
  return (
    <div className={classes.ActiveQuiz}>
      <div className={classes.ActiveQuiz__header}>
        <span>
          <strong>{props.activeQuestion}. </strong>
          {props.question}
        </span>
        <span>{props.activeQuestion} из {props.quizLength}</span>
      </div>
      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        answerClasses={props.answerClasses}
      />
    </div>
  )
}

export default ActiveQuiz;
