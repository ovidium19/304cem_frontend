import React from 'react'
import { connect} from 'react-redux'
import {Route} from 'react-router-dom'
import PropTypes from  'prop-types'
import LoginPage from './Login/LoginPage'
import SignupPage from './Signup/SignupPage'
import AccountPage from './Account/AccountPage'


class Account extends React.Component {
    constructor(props, context){
        super(props,context)
    }
    render() {
        return (
        <React.Fragment>
            <Route exact path={`${this.props.match.path}/login`} component = {LoginPage}/>
            <Route exact path={`${this.props.match.path}/signup`} component = {SignupPage}/>
            {this.props.username &&
            <Route exact path={`${this.props.match.path}/${this.props.username}`} component={AccountPage}/>
            }
        </React.Fragment>
        )
    }
  }

Account.propTypes = {
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    username: PropTypes.string,
}

function mapStateToProps(state, ownProps) {
    return {
        loading: state.asyncInProgress > 0,
        username: state.user.username
    }
}

export default connect(mapStateToProps)(Account)
