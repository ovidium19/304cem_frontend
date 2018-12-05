import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router-dom'
import SignupForm from './SignupForm'
import * as userActions from '../../../actions/userActions'
import toastr from 'toastr'
import '../Forms.less'

export class SignupPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: Object.assign({},this.props.user, {repeatPassword: '', name: '', email: ''}),
            loading: false,
            redirect: false,
            errors: {}
        }
        this.onStateUpdate = this.onStateUpdate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onStateUpdate(event) {
        const field = event.target.name
        const user = Object.assign({},this.state.user)

        user[field] = event.target.value
        this.setState({user})

    }
    validateForm() {
        let error = false
        let newErrors = {}
        if (this.state.user.password.length < 6)
        {
            newErrors.password = 'Your password must contain at least 6 characters'
            error = true
        }
        if (this.state.user.repeatPassword !== this.state.user.password) {
            newErrors.repeatPassword = 'Your passwords don\'t match'
            error = true
        }

        if (error) {
            this.setState({
                errors: newErrors
            })
            return false
        }
        else{
            this.setState({
                errors: {}
            })
            return true
        }

    }
    onSubmit(event) {
        event.preventDefault()
        if (!(this.validateForm())) return
        this.setState({loading: true})

        this.props.actions.signUpUser(this.state.user)
            .then(() => this.redirect())
            .catch(err => {

                this.setState({
                    errors: {
                        username: err.response.data.data.detail
                    },
                    loading: false
                })
            })
    }
    redirect() {
        this.setState({
            loading: false,
            redirect: true
        })
        toastr.success('Account created, you may now log in to the system')
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={'/account/login'} />
            )
        }
        return (
                <SignupForm
                onChange = {this.onStateUpdate}
                onSubmit = {this.onSubmit}
                loading = {this.state.loading}
                errors = {this.state.errors}
                user = {this.state.user} />
            )
    }
}
SignupPage.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}
function mapStateToProps(state,ownProps) {
    return {
        user: state.user
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(userActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignupPage)
