import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import configureStore from './store/configureStore'
import App from './components/App'
import '../node_modules/toastr/build/toastr.min.css'
import './Index.less'
//no complexity eslint rule because reducers have high complexity due to switches
let store = configureStore()

render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    document.getElementById('app')
  )
export default {}
