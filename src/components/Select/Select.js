import {Fragment} from "react";
import classes from './Select.module.css';

const Select = (props) => {
  return (
    <Fragment>
      <label
        className={classes.label}
        htmlFor="select"
      >{props.label}</label>
      <select
        className={classes.select}
        id="select"
        value={props.value}
        onChange={(e) => props.onSelectValue(e.target.value)}
      >
        {
          props.options.map((option) => {
            return (
              <option key={`option-${option.value}`} value={option.value}>{option.text}</option>
            )
          })
        }
      </select>
    </Fragment>

  )
}

export default Select;