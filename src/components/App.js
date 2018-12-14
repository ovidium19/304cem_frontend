import React from 'react'
import { connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../actions/userActions'
import HomePage from './home/HomePage'
import Header from './header/Header'
import Account from './account/Account'
import ProtectedResources from './common/ProtectedResources'
import {Route} from 'react-router-dom'
import PropTypes from  'prop-types'
import toastr from 'toastr'
toastr.options.timeOut = 1000 // How long the toast will display without user interaction
toastr.options.extendedTimeOut = 1500 // How long the toast will display after a user hovers over it
class App extends React.Component {
    constructor(props){
        super(props)
        this.onSignOut = this.onSignOut.bind(this)
    }
    onSignOut(event) {
        event.preventDefault()

        this.props.actions.signOutUser()
        toastr.success('User signed out')
        this.props.history.push('/')
    }

    render() {

        return (
            <React.Fragment>
                <Header onSignOut={this.onSignOut}/>
                <Route exact path="/" component={HomePage}/>
                <Route path='/account' component={Account} />
                <Route path='/app' render={(props) => (
                    <ProtectedResources user={this.props.user} {...props} />
                )
                }/>

            </React.Fragment>


        )
    }
  }

App.propTypes = {
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        loading: state.asyncInProgress > 0,
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
