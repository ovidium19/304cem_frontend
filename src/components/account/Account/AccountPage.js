import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import WelcomeUserMessage from './WelcomeUserMessage'
import AccountForm from './AccountForm'
import * as userActions from '../../../actions/userActions'
import toastr from 'toastr'
import '../Forms.less'

export class AccountPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: Object.assign({},this.props.user),
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

    onSubmit(event) {
        event.preventDefault()

        this.setState({loading: true})

        this.props.actions.updateUser(this.state.user)
            .then(() => {
                toastr.success('Your role has been updated')
                this.setState({loading: false})
            })
            .catch(err => {
                toastr.error(err)
                this.setState({loading: false})
            })
    }
    render() {
        return (
                <React.Fragment>
                    <WelcomeUserMessage user={this.props.user} />
                    <AccountForm
                    onChange = {this.onStateUpdate}
                    onSubmit = {this.onSubmit}
                    loading = {this.state.loading}
                    errors = {this.state.errors}
                    user = {this.state.user}
                    role = {this.props.user.roles} />
                </React.Fragment>

            )
    }
}
AccountPage.propTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps)(AccountPage)
