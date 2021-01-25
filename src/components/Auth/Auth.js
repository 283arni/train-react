import {Component} from 'react';
import ButtonRepeat from "../ButtonRepeat/ButtonRepeat";
import Field from "../Field/Field";
import classes from './Auth.module.css';
import {connect} from "react-redux";
import {auth} from "../../redux/actions/auth";

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {

  state = {
    isFormValid: false,
    fields: {
      email: {
        type: "email",
        label: "Email",
        idField: "email",
        errorText: "Не правельный email",
        value: null,
        valid: true,
        touched: false,
        validation: {
          require: true,
          email: true
        }
      },
      password: {
        type: "password",
        label: "Password",
        idField: "password",
        errorText: "Не правельный password",
        valid: true,
        value: null,
        touched: false,
        validation: {
          require: true,
          minLength: 6
        }
      }
    }
  }

  handleLoginClick = async () => {
    this.props.auth(
      this.state.fields.email.value,
      this.state.fields.password.value,
      true
    )
  }

  handleRegisterClick = async () => {
    this.props.auth(
      this.state.fields.email.value,
      this.state.fields.password.value,
      false
    )
  }


  handleFieldChange = (e, key) => {
    const copyFields = {...this.state.fields}
    const field = {...copyFields[key]}

    field.value = e.target.value

    if (field.validation.required) {
      field.valid = field.value.trim() !== ''
    }

    if (field.validation.email) {
      field.valid = validateEmail(field.value)
    }

    if (field.validation.minLength) {
      field.valid = field.value.length >= field.validation.minLength
    }

    copyFields[key] = field

    let isFormValid = true;

    Object.values(copyFields).forEach((input) => {
      isFormValid = input.valid && input.value && isFormValid
    })

    this.setState({
      fields: copyFields,
      isFormValid
    })
  }

  renderFields = () => {
    return Object.keys(this.state.fields).map((field, index) => {
      const control = this.state.fields[field];

      return (
        <Field
          key={index}
          type={control.type}
          label={control.label}
          idField={control.idField}
          isValid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorText={control.errorText}
          onFieldChange={this.handleFieldChange}
        />
      )
    })
  }


  render() {
    return (
      <div className={classes.Auth}>
        <h1>Авторизация</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={classes.fields}>
            {this.renderFields()}
          </div>

          <ButtonRepeat
            type="success"
            onResetClick={this.handleLoginClick}
            disabled={!this.state.isFormValid}
          >
            Войти
          </ButtonRepeat>
          <ButtonRepeat
            type="primary"
            onResetClick={this.handleRegisterClick}
            disabled={!this.state.isFormValid}
          >
            Зарегистрироваться
          </ButtonRepeat>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
})

export default connect(null, mapDispatchToProps)(Auth) ;
