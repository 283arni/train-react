import classes from './ButtonRepeat.module.css'

const ButtonRepeat = (props) => {


  return (
    <button
      className={`${classes.ButtonRepeat} ${classes[props.type]}`}
      onClick={props.onResetClick ? () => props.onResetClick() : null}
    >
      {props.children}
    </button>
  )
}

export default ButtonRepeat;