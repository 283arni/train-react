import {Component, Fragment} from 'react';
import ButtonRepeat from "../ButtonRepeat/ButtonRepeat";
import Field from "../Field/Field";
import createControl from "../../utils";
import Select from "../Select/Select";
import classes from './QuizCreator.module.css'

const createFormControl = () => {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorText: 'Заполните поле',
      idField: 'question'
    }, {required: true}),
    option1: createOptionControls(1),
    option2: createOptionControls(2),
    option3: createOptionControls(3),
    option4: createOptionControls(4)
  }
}

const createOptionControls = (number) => {
  return createControl({
    label: `Вопрос ${number}`,
    errorText: 'Заполните поле',
    idField: `option${number}`
  },{required: true})
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    selectChangedValue: 1,
    formControls: createFormControl()
  }

  handleButtonTestClick = async () => {
    try {
      await fetch('https://quiz-49026-default-rtdb.europe-west1.firebasedatabase.app/quiz.json',{method: 'POST', body: JSON.stringify(this.state.quiz)})
    } catch (error) {
      console.log(error)
    }
  }

  handleButtonQuestionClick = () => {
    const copyQuiz = this.state.quiz.concat();
    const index = copyQuiz.length + 1

    const {question, option1, option2, option3, option4} = this.state.formControls
    const quizItem = {
      question: question.value,
      correctAnswerId: this.state.selectChangedValue,
      questionId: index,
      answers: [
        {
          text: option1.value,
          id: option1.idField
        },
        {
          text: option2.value,
          id: option2.idField
        },
        {
          text: option3.value,
          id: option3.idField
        },
        {
          text: option4.value,
          id: option4.idField
        },
      ]
    }

    copyQuiz.push(quizItem)


    this.setState({
      quiz: copyQuiz,
      isFormValid: false,
      selectChangedValue: 1,
      formControls: createFormControl()
    })

  }

  handleSelectChange = (value) => {
    console.log(this.state)
    this.setState({
      selectChangedValue: value
    })
  }

  handleFieldChange = (e, key) => {
    const copyFields = {...this.state.formControls}
    const field = {...copyFields[key]}

    field.value = e.target.value
    if (field.validation.required) {
      field.valid = field.value.trim() !== ''
    }

    copyFields[key] = field

    let isFormValid = true;

    Object.values(copyFields).forEach((input) => {
      isFormValid = input.valid && input.value && isFormValid
    })


    this.setState({
      formControls: copyFields,
      isFormValid
    })
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
            value={control.value}
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
    const select = (
      <Select
        value={this.state.selectChangedValue}
        onSelectValue={this.handleSelectChange}
        options={[
          {value: 1, text: '1'},
          {value: 2, text: '2'},
          {value: 3, text: '3'},
          {value: 4, text: '4'}
        ]}
      />
    )

    return (
      <div className={classes.QuizCreator}>
        <h1>Создать вопрос</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          {this.renderFields()}

          {select}

          <ButtonRepeat
            type="success"
            disabled={!this.state.quiz.length}
            onResetClick={this.handleButtonTestClick}
          >
            Создать тест
          </ButtonRepeat>
          <ButtonRepeat
            type="primary"
            disabled={!this.state.isFormValid}
            onResetClick={this.handleButtonQuestionClick}
          >
            Добавить вопрос
          </ButtonRepeat>
        </form>

      </div>
    )
  }
}

export default  QuizCreator;
