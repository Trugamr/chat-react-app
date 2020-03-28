import React from 'react'

import {
  RegisterPageContainer,
  RegisterFormContainer,
  RegisterForm,
  Heading,
  LoginMessageContainer
} from './register.styles'

import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import FormError from '../../components/form-error/form-error.component'
import CustomLink from '../../components/custom-link/custom-link.component'

import { FaUserAlt, FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

class RegisterPage extends React.Component {
  render() {
    return (
      <RegisterPageContainer>
        <RegisterFormContainer>
          <Heading>Register</Heading>
          <RegisterForm>
            <CustomInput Icon={FaUserAlt} placeholder="Username" required />
            <CustomInput
              Icon={MdEmail}
              type="email"
              placeholder="Email"
              required
            />
            <CustomInput
              Icon={FaLock}
              type="password"
              placeholder="Password"
              required
            />
            <CustomInput
              Icon={FaLock}
              type="password"
              placeholder="Confirm Password"
              required
            />
            <CustomButton type="submit" fontSize="18px">
              Submit
            </CustomButton>
          </RegisterForm>
          <FormError />
          <LoginMessageContainer>
            <div>
              <span>Already a user?</span>
              <CustomLink to="/login">Login</CustomLink>
            </div>
          </LoginMessageContainer>
        </RegisterFormContainer>
      </RegisterPageContainer>
    )
  }
}

export default RegisterPage
