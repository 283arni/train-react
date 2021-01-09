import classes from './FinishedQuiz.module.css'
import ButtonRepeat from "../ButtonRepeat/ButtonRepeat";


const FinishedQuiz = (props) => {
  const currentAnswers = Object.values(props.results).filter((value) => value === 'current');

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {
          props.quiz.map((item) => {
            const iconType = props.results[item.questionId] === 'error' ? "fas fa-times " + classes.error : "fas fa-check " + classes.current

            return (
              <li
                key={item.questionId}
              >
                <span>{item.questionId}. </span>
                {item.question}
                <i className={iconType}/>
              </li>
            )
          })
        }
      </ul>

      <div>Правильно {currentAnswers.length} из {props.quizLength}</div>


      <ButtonRepeat
        onResetClick={props.onResetClick}
        type='primary'
      >
        Повторить
      </ButtonRepeat>
      <ButtonRepeat
        type='success'
      >
        Перейти к другим тестам
      </ButtonRepeat>
    </div>
  )
}

export default FinishedQuiz;
