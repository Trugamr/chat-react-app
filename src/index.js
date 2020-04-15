import React from 'react'
import { connect, Provider } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './pages/app/app.component'
import * as serviceWorker from './serviceWorker'
import { auth } from './firebase/firebase.utils'

import CustomThemeProvider from './components/custom-theme-provider/custom-theme-provider.component'
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import RegisterPage from './pages/register/register.component'
import LoginPage from './pages/login/login.component'

import store from './redux/store'

import { setCurrentUser, clearCurrentUser } from './redux/user/user.actions'
import { selectUserIsLoading } from './redux/user/user.selectors'

import Spinner from './components/spinner/spinner.component'

class Root extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { history, setCurrentUser, clearCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user)
        history.push('/')
      } else {
        history.push('/login')
        clearCurrentUser()
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    const { isLoading } = this.props

    return isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectUserIsLoading
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearCurrentUser: () => dispatch(clearCurrentUser())
})

const RootWithRouter = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Root)
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <Router basename="/">
          <RootWithRouter />
        </Router>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
