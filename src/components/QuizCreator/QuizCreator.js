import {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import ButtonRepeat from "../ButtonRepeat/ButtonRepeat";
import Field from "../Field/Field";
import createControl from "../../utils";
import Select from "../Select/Select";
import classes from './QuizCreator.module.css'
import {createQuestion, createTest} from "../../redux/actions/creator";

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

    this.props.createQuestion(quizItem)


    this.setState({
      isFormValid: false,
      selectChangedValue: 1,
      formControls: createFormControl()
    })

  }

  handleSelectChange = (value) => {
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
            disabled={!this.props.quiz.length}
            onResetClick={this.props.onButtonTestClick}
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

const mapStateToProps = (state) => ({
  quiz: state.creator.quiz
})

const mapDispatchToProps = (dispatch) => ({
  createQuestion: (item) => dispatch(createQuestion(item)),
  onButtonTestClick: () => dispatch(createTest())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator) ;
