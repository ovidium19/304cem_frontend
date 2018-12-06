import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import toastr from 'toastr'
import PropTypes from 'prop-types'
import ResultPage from '../results/ResultPage'
import ActivitiesPage from '../activities/ActivitiesPage'
import CreateActivity from '../activities/createActivity/CreateActivity'

class ProtectedResources extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            link: ''
        }
    }
    componentDidMount() {
        if (!(this.props.user.header)) {
            this.redirectTo('/account/login')
            toastr.warning('You must login first to see this content')
            return
        }
    }

    redirectTo(link) {
        this.setState({
            redirect: true,
            link
        })
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.link} />
            )
        }
        return (
            <React.Fragment>
                <Route exact path={`${this.props.match.path}/user/:username/stats`} component={ResultPage} />
                <Route exact path={`${this.props.match.path}/user/:username/activities`} component={ActivitiesPage} />
                <Route exact path={`${this.props.match.path}/activity/create`} component={CreateActivity} />

            </React.Fragment>
        )
    }
}
ProtectedResources.propTypes = {
    user: PropTypes.object.isRequired
}
export default ProtectedResources
