import AnswerItem from '../AnswerItem/AnswerItem'
import classes from './AnswersList.module.css'

const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((item, index) =>
        <AnswerItem
          key={index}
          id={index + 1}
          item={item}
          onAnswerClick={props.onAnswerClick}
          answerClasses={props.answerClasses}
        />
      )}
    </ul>
  )
}

export default AnswersList;
