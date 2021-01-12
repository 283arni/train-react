import classes from './Field.module.css'
import {Fragment} from "react";

const Field = (props) => {
  return (
    <Fragment>
      <label
        className={classes.label}
        htmlFor={props.idField}
      >
        {props.label}
      </label>
      <input
        className={classes.input}
        type={props.type}
        id={props.idField}
        onChange={(e) => props.onFieldChange(e, props.idField)}
        autoComplete="no"
      />

      {
        props.isValid ?
          null
          :
          <div className={classes.error}>{props.errorText}</div>
      }

    </Fragment>
  )
}

export default Field;
