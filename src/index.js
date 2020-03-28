import React from 'react'
import { connect, Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { auth } from './firebase/firebase.utils'

import CustomThemeProvider from './components/custom-theme-provider/custom-theme-provider.component'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import RegisterPage from './pages/register/register.component'
import LoginPage from './pages/login/login.component'

import store from './redux/store'

import { setCurrentUser } from './redux/user/user.actions'

class Root extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { history, setCurrentUser } = this.props

    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user)
        history.push('/')
      }
    })
  }

  componentWillUnmount() {}

  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

const RootWithRouter = withRouter(connect(null, mapDispatchToProps)(Root))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <Router>
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
