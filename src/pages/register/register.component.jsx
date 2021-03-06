import React from 'react'
import { connect } from 'react-redux'
import { auth, firestore, storage } from '../../firebase/firebase.utils'

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

import { setCurrentUser } from '../../redux/user/user.actions'

import avatarBlob from '../../resources/images/avatar.blob'

class RegisterPage extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
    loading: false,
    usersRef: firestore.collection('users')
  }

  isFormValid = () => {
    const errors = []
    let error

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields.' }
      this.setState({ errors: errors.concat(error) })
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is invalid.' }
      this.setState({ errors: errors.concat(error) })
    } else {
      return true
    }
  }

  isFormEmpty = ({ username, email, password, confirmPassword }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    )
  }

  isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) return false
    else if (password !== confirmPassword) return false
    else return true
  }

  handleSubmit = event => {
    event.preventDefault()

    const { username, email, password, loading } = this.state
    const { setCurrentUser } = this.props

    if (!this.isFormValid() || loading) return

    this.setState({ errors: [], loading: true })

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async createdUser => {
        console.log(createdUser)

        let avatarURL = null

        try {
          avatarURL = await this.getAvatarUrl({
            email,
            uid: createdUser.user.uid
          })
        } catch (err) {
          console.error(err)
        }

        createdUser.user
          .updateProfile({
            displayName: username,
            photoURL: avatarURL
          })
          .then(() => {
            this.saveUser(createdUser).then(() => {
              setCurrentUser({ ...createdUser.user })
              console.log('user saved')
              // register success
            })
          })
          .catch(err => {
            console.error(err)
            this.setState(({ errors }) => ({
              errors: errors.concat(err)
            }))
          })
      })
      .catch(err => {
        console.error(err)
        this.setState(({ errors }) => ({
          errors: errors.concat(err)
        }))
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  saveUser = createdUser => {
    const { usersRef } = this.state
    const { uid, displayName, photoURL } = createdUser.user
    return usersRef.doc(uid).set({
      name: displayName,
      avatar: photoURL
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleInputError(errors, inputName) {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
  }

  getAvatarUrl = ({ uid }) => {
    return new Promise((resolve, reject) => {
      storage
        .ref()
        .child(`avatars/users/${uid}`)
        .put(avatarBlob, { contentType: 'image/jpeg' })
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => resolve(url))
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      errors,
      loading
    } = this.state

    return (
      <RegisterPageContainer>
        <RegisterFormContainer>
          <Heading>Register</Heading>
          <RegisterForm onSubmit={this.handleSubmit}>
            <CustomInput
              Icon={FaUserAlt}
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
              value={username}
            />
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
            <CustomInput
              Icon={FaLock}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              value={confirmPassword}
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
          </RegisterForm>
          {errors.length ? <FormError errors={errors} /> : null}
          <LoginMessageContainer>
            <div>
              <span>Already a user?</span>
              <CustomLink to="/login">&nbsp;Login&nbsp;</CustomLink>
            </div>
          </LoginMessageContainer>
        </RegisterFormContainer>
      </RegisterPageContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(RegisterPage)
