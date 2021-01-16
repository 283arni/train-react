import classes from './AnswerItem.module.css'


const AnswerItem = (props) => {

  let classesList = [classes.AnswerItem]

  if (props.answerClasses && props.answerClasses[props.id] === 'current') {
    classesList.push(classes.current);
  }

  if (props.answerClasses && props.answerClasses[props.id] === 'error') {
    classesList.push(classes.error);
  }

  return (
    <li
      className={classesList.join(' ')}
      onClick={() => props.onAnswerClick(props.id)}
    >
      {props.item.text}
    </li>
  )
}

export default AnswerItem;
