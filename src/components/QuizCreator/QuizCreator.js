import {Component, Fragment} from 'react';
import ButtonRepeat from "../ButtonRepeat/ButtonRepeat";
import Field from "../Field/Field";
import createControl from "../../utils";
import classes from './QuizCreator.module.css'

const createOptionControls = (number) => {
  return createControl({
    label: `Вопрос ${number}`,
    errorMessage: 'Заполните поле',
    idField: `text-${number}`
  },{required: true})
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    isDisabled: true,
    formControls: {
      question: createControl({
        label: 'Введите вопрос',
        errorMessage: 'Заполните поле',
        idField: 'question'
      }, {required: true}),
      option1: createOptionControls(1),
      option2: createOptionControls(2),
      option3: createOptionControls(3),
      option4: createOptionControls(4)
    }
  }

  handleButtonTestClick = () => {

  }

  handleButtonQuestionClick = () => {

  }

  handleFieldChange = (e, key) => {
    console.log(e, key)
  }

  renderFields = () => {
    return Object.keys(this.state.formControls).map((field, index) => {
      const control = this.state.formControls[field];
      return (
        <Fragment key={index}>
          <Field
            type={control.type}
            label={control.label}
            idField={control.idField}
            isValid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            errorText={control.errorText}
            onFieldChange={this.handleFieldChange}
          />

          {index === 0 ? <hr/> : null}
        </Fragment>
      )
    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <h1>Создать вопрос</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          {this.renderFields()}

          <select name="" id=""></select>

          <ButtonRepeat
            type="success"
            disabled={this.state.isDisabled}
            onButtonTestClick={this.handleButtonTestClick}
          >
            Создать тест
          </ButtonRepeat>
          <ButtonRepeat
            type="primary"
            disabled={this.state.isDisabled}
            onButtonQuestionClick={this.handleButtonQuestionClick}
          >
            Добавить вопрос
          </ButtonRepeat>
        </form>

      </div>
    )
  }
}

export default  QuizCreator;
