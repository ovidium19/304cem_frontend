import {Link, Redirect} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import LoadingIcon from '../../common/LoadingIcon'
import ActivitiesList from '../ActivitiesList'
import ReviewActivityItem from './ReviewActivityItem'
import * as activityActions from '../../../actions/activityActions'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import _ from 'underscore'
import toastr from 'toastr'

export class ReviewActivitiesPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                page: 1,
                limit: 5,
                review: true
            },
            loading: [],
            status: [],
            redirect: false,
            link: '',
            updated: false,

        }
        this.onPageSelection = this.onPageSelection.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.onPublish = this.onPublish.bind(this)
    }

    componentDidMount() {
        if (this.props.activities.length == 0 && this.state.updated == false) {

            this.props.actions.getReviewActivities(this.props.user.header,this.state.options)
                .then(res => {

                    this.setState({
                        loading: Array.from(this.props.activities, b => false),
                        status: Array.from(this.props.activities, b => '')
                    })
                })
                .catch(err => {
                    //toastr.error(err.message)
                })
        }
    }
    componentWillUnmount() {
        this.props.actions.removeActivities()
    }
    getActivities(params) {
        this.props.actions.getReviewActivities(this.props.user.header,
            this.props.user.username, params).then(res => {
                this.setState({
                    updated: true
                })
            })
    }
    setIndexState(index, loadingState, statusState) {
            let loading = Array.from(this.state.loading)
            let status = Array.from(this.state.status)
            loading[index] = loadingState
            status[index] = statusState
            this.setState({
                loading,
                status
            })
    }
    onPublish(act,index) {

        this.setIndexState(index,true,'')
        this.props.actions.publishActivity(this.props.user.header,act).then(res => {
            console.log(res)
            this.setIndexState(index,false,'published')
        }).catch(err => {
            this.setIndexState(index,false,'')
        })
    }
    onRemove(id, index) {

        this.setIndexState(index,true,'')
        this.props.actions.declineActivity(this.props.user.header,id).then(res => {
            console.log(res)
            this.setIndexState(index,false,'removed')
        }).catch(err => {
            this.setIndexState(index,false,'')
        })
    }
    onPageSelection(cur,size) {
        this.setState({
            options:{
                page: cur,
                limit: size,
                review: true
            },
            updated: false
        },() => {
            let params = Object.assign({},this.state.options)
            this.getActivities(params).then(
                res => {
                    this.setState({
                        loading: Array.from(this.props.activities, b => false),
                        status: Array.from(this.props.activities, b => '')
                    })
                }
            )
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.link} />
        }
        if (!(/reviewer/.test(this.props.user.roles))){
            return (
                <div className='container-fluid activities my-0 py-4'>
                    <div className='jumbotron text-center my-3'>
                        <p className='display-4'>Warning</p>
                        <p className='lead'>You don't have permission to review activities. Please review your user settings
                        on your Account page.
                        </p>
                        <Link to={`/account/${this.props.user.username}`} className='btn btn-success'>Go to your account</Link>
                    </div>
                </div>
            )
        }
        return (
            <div className='container-fluid activities my-0 py-4'>
                <div className='activities-list p-0 card'>
                    <div className='card-header'>
                        <p className='display-4 text-center'>Activities</p>


                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <Pagination
                            total = {this.props.count}
                            current = {this.state.options.page}
                            pageSize = {this.state.options.limit}
                            defaultPageSize = {this.state.options.limit}
                            showTotal = {(total) => `${total} items`}
                            hideOnSinglePage = {true}
                            className = {'align-self-end my-3'}
                            onChange = {this.onPageSelection}
                            />
                        </div>
                    </div>
                        {
                            this.props.activities.length > 0 ?
                                <ActivitiesList activities={this.props.activities}
                                onClick={this.onActivityClicked}
                                klass={'card-body m-0 p-0'}
                                Item = {ReviewActivityItem}
                                loading = {this.state.loading}
                                status = {this.state.status}
                                onPublishAct = {this.onPublish}
                                onRemoveAct = {this.onRemove} />
                                :
                                <div className='d-flex justify-content-center align-items-center flex-column'>
                                    <p className='lead mb-2'>There are currently no questions under review.
                                    </p>
                                </div>
                            }
                    </div>
            </div>
        )
    }
}
ReviewActivitiesPage.propTypes = {
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
        username: state.user.username,
        roles: state.user.roles
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

export default connect(mapStateToProps,mapDispatchToProps)(ReviewActivitiesPage)
