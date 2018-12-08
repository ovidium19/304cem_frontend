import {Link, Redirect} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import LoadingIcon from '../common/LoadingIcon'
import * as activityActions from '../../actions/activityActions'
import ActivitiesList from './ActivitiesList'
import ActivityFilters from './ActivityFilters'
import categories from '../common/categories'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

import _ from 'underscore'
import './ActivitiesPage.less'

export class ActivitiesPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                page: 1,
                limit: 5
            },
            filters: {
                published: '',
                category: '',
            },
            redirect: false,
            link: '',
            sortBy: '',
            currentPage: 1,
            updated: false,
            selectOptions: categories,
            sortOptions: [
                {
                    value: 'avg_rating',
                    text: 'Highest Rating'
                },
                {
                    value: 'total_answers',
                    text: 'Answers'
                },
                {
                    value: 'avg_passrate',
                    text: 'Pass Rate'
                },
                {
                    value: 'timestamp',
                    text: 'Newest'
                }
            ]
        }
        this.onActivityClicked = this.onActivityClicked.bind(this)
        this.onBlankClicked = this.onBlankClicked.bind(this)
        this.onFilterUpdate = this.onFilterUpdate.bind(this)
        this.applyFilters = this.applyFilters.bind(this)
        this.onSortUpdate = this.onSortUpdate.bind(this)
        this.createActivity = this.createActivity.bind(this)
        this.onPageSelection = this.onPageSelection.bind(this)
    }

    componentDidMount() {
        if (this.props.activities.length == 0 && this.state.updated == false) {

            this.props.actions.getActivities(this.props.user.header,this.props.user.username, this.state.options).then(
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

    onFilterUpdate(event) {
        const field = event.target.name
        const filters = Object.assign({},this.state.filters)

        filters[field] = event.target.value
        this.setState({filters})

    }

    onSortUpdate(event) {
        this.setState({sortBy: event.target.value})

    }
    getActivities(params) {
        this.props.actions.getActivities(this.props.user.header,
            this.props.user.username, params).then(res => {
                this.setState({
                    updated: true,
                    currentPage: 1
                })
            })
    }
    onPageSelection(cur,size) {
        this.setState({
            options:{
                page: cur,
                limit: size
            },
            updated: false
        },() => {
            let params = Object.assign({},this.state.options,this.state.filters,{sort: this.state.sortBy})
            console.log(params)
            this.getActivities(params)
        })

    }
    applyFilters(event) {
        event.preventDefault()
        this.setState({
            options: {
                page: 1,
                limit: 5
            }
        }, () => {
            let params = Object.assign({},this.state.options,this.state.filters,{sort: this.state.sortBy})
            this.getActivities(params)
        })


    }
    createActivity(e) {
        e.preventDefault()
        this.props.history.push('/app/activity/create')
    }

    onActivityClicked(id) {
        console.log(id),
        this.setState({
            redirect: true,
            link: `/app/${this.props.user.username}/activity/${id}`
        })
    }
    onBlankClicked(value) {
        console.log(value)
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.link} />
        }
        return (
            <div className='container-fluid activities my-0 py-4'>
                <div className='activities-list p-0 card'>
                    <div className='card-header'>
                        <p className='display-4 text-center'>Activities</p>
                        <div className='text-center'>
                        <button className='btn btn-success' onClick={this.createActivity}>Create new Activity</button>
                        </div>

                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                <ActivityFilters
                                onChange={this.onFilterUpdate}
                                onSubmit={this.applyFilters}
                                filters = {this.state.filters}
                                loading = {this.props.loading}
                                selectOptions = {this.state.selectOptions}
                                onSortUpdate={this.onSortUpdate}
                                sort = {this.state.sortBy}
                                sortOptions = {this.state.sortOptions}
                                />
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

                        {this.props.loading ?
                            <LoadingIcon /> :
                            this.props.activities.length > 0 ?
                                <ActivitiesList activities={this.props.activities}
                                onClick={this.onActivityClicked}
                                onBlankClick={this.onBlankClicked}
                                klass={'card-body m-0 p-0'} />
                                :
                                <div className='d-flex justify-content-center align-items-center flex-column'>
                                    <p className='lead mb-2'>You have no activities created that match the filters above.
                                        You may not have any activities at all.
                                    </p>
                                    <Link to='/app/activity/create/' className='text-success font-weight-bold'>Create New Activity</Link>
                                </div>
                            }


                    </div>
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
