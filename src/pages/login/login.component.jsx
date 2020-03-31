import React from 'react'
import { auth } from '../../firebase/firebase.utils'

import {
  LoginPageContainer,
  LoginFormContainer,
  LoginForm,
  Heading,
  RegisterMessageContainer
} from './login.styles'

import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import FormError from '../../components/form-error/form-error.component'
import CustomLink from '../../components/custom-link/custom-link.component'

import { FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

class LoginPage extends React.Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false
  }

  handleSubmit = event => {
    event.preventDefault()
    if (!this.isFormValid(this.state)) return

    this.setState({ errors: [], loading: true })

    const { email, password } = this.state

    auth
      .signInWithEmailAndPassword(email, password)
      .then(signedInUser => {
        console.log(signedInUser)
        // login success
      })
      .catch(err => {
        console.error(err)
        this.setState(({ errors }) => ({
          errors: errors.concat(err),
          loading: false
        }))
      })
  }

  isFormValid = ({ email, password }) => email && password

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleInputError(errors, inputName) {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
  }

  render() {
    const { email, password, errors, loading } = this.state

    return (
      <LoginPageContainer>
        <LoginFormContainer>
          <Heading>Login</Heading>
          <LoginForm onSubmit={this.handleSubmit}>
            <CustomInput
              Icon={MdEmail}
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={email}
              error={this.handleInputError(errors, 'email')}
            />
            <CustomInput
              Icon={FaLock}
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={password}
              error={this.handleInputError(errors, 'password')}
            />
            <CustomButton
              disabled={loading}
              loading={loading}
              height="50px"
              type="submit"
              fontSize="18px"
            >
              Submit
            </CustomButton>
          </LoginForm>

          {errors.length ? <FormError errors={errors} /> : null}

          <RegisterMessageContainer>
            <div>
              <span>Don't have an account?</span>
              <CustomLink to="/register">&nbsp;Register&nbsp;</CustomLink>
            </div>
          </RegisterMessageContainer>
        </LoginFormContainer>
      </LoginPageContainer>
    )
  }
}

export default LoginPage
