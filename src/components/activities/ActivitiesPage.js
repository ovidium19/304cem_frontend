import {Link} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import LoadingIcon from '../common/LoadingIcon'
import * as activityActions from '../../actions/activityActions'

import _ from 'underscore'
import './ActivitiesPage.less'

export class ActivitiesPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            defaultOptions: {
                page: 1,
                limit: 6
            },
            currentPage: 1,
            updated: false
        }
        this.onActivityClicked = this.onActivityClicked.bind(this)
    }

    componentDidMount() {
        if (this.props.activities.length == 0 && this.state.updated == false) {

            this.props.actions.getActivities(this.props.user.header,this.props.user.username, this.state.defaultOptions).then(
                res => {

                    this.setState({
                        updated: true
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    componentWillUnmount() {
        this.props.actions.removeActivities()
    }

    onActivityClicked(id) {
        console.log(id)
    }
    render() {
        return (
            <div className='container-fluid activities my-0 py-4'>
            {this.props.loading ?
                <LoadingIcon /> :
                this.props.activities.length > 0 ?
                    <React.Fragment>
                        {JSON.stringify(this.props.activities)}
                        {'count: ' + this.props.count}

                    </React.Fragment>

                    :
                    <div>No data</div>
            }
            </div>
        )
    }
}

ActivitiesPage.propTypes = {
    user: PropTypes.object.isRequired,
    activities: PropTypes.array.isRequired,
    count: PropTypes.number,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object
}
function mapStateToProps(state,ownProps) {
    let user = {
        header: '',
        username: state.user.username
    }
    if (state.user.hasOwnProperty('header')){
        user.header = state.user.header
    }

    return {
        user,
        activities: state.userActivities.data,
        count: state.userActivities.count,
        loading: state.asyncCalls > 0
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(activityActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ActivitiesPage)
