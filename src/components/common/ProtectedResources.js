import React from 'react'
import {Redirect} from 'react-router-dom'
import toastr from 'toastr'
import PropTypes from 'prop-types'

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
        return null
    }
}
ProtectedResources.propTypes = {
    user: PropTypes.object.isRequired
}
export default ProtectedResources
