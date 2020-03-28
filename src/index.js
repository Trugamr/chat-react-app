import React from 'react'
import { Provider } from 'react-redux'
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

class Root extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { history } = this.props
    auth.onAuthStateChanged(user => {
      if (user) {
        history.push('/')
      }
    })
  }

  componentWillUnmount() {}

  render() {
    return (
      <Provider store={store}>
        <CustomThemeProvider>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </CustomThemeProvider>
      </Provider>
    )
  }
}

const RootWithRouter = withRouter(Root)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RootWithRouter />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
