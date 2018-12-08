import {Link, Redirect} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import ActivityTitleDiv from './ActivityTitleDiv'
import ActivityStats from '../ActivityStats'
import * as activityActions from '../../../actions/activityActions'
import FeedbackList from './feedback/FeedbackList'
import 'rc-pagination/assets/index.css'
import toastr from 'toastr'
import _ from 'underscore'
import PieChart from '../../results/PieChart'
import LoadingIcon from '../../common/LoadingIcon'


export class ActivityPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                limit: 5
            },
            redirect: false,
            link: '',
            sortBy: 'timestamp',
            currentPage: 1,
            feedbackStartIndex: 0,
            updated: false,
        }
        this.onPageSelection = this.onPageSelection.bind(this)
        this.onGoBack = this.onGoBack.bind(this)
        this.onPublish = this.onPublish.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
    }

    componentDidMount() {
        if (!(this.props.act.hasOwnProperty('_id')) && !(this.state.updated)) {

            this.props.actions.getActivityById(this.props.user.header,this.props.match.params.id).then(
                res => {
                    this.setState({
                        updated: true
                    })
                    this.calculateAnswerChoices(0)
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    componentWillUnmount() {
        //this.props.actions.removeActivity()
    }
    calculateAnswerChoices(index) {
        let data = this.props.act.answers
        let obj = _.countBy(data,(d) => d.correctEach[index].answer)
        //transform data in a way readable by Chart.js
         let result = Object.keys(obj).reduce((p,c,i) => {
             p.datasets[0].data.push(obj[c])
             p.labels.push(c)
             return p
         },
         {datasets: [
             {
                 data: []
             }],
         labels: []
         })
         return result
    }
    onPageSelection(cur,size) {
        console.log(cur,size)
        this.setState({
            currentPage: cur,
            feedbackStartIndex: (cur-1)*this.state.options.limit,
        })
    }
    onGoBack(e){
        e.preventDefault()
        this.setState({
            redirect: true,
            link: `/app/user/${this.props.user.username}/activities`
        })
    }
    nextPublishState(activity) {
        let act = Object.assign({},activity)
        //not yet fully published
        if (!(act.published)) act.under_review = !(act.under_review)

        //published
        else act.published = false
        return act


    }
    onPublish(e) {
        e.preventDefault()
        let newState = this.nextPublishState(this.props.act)
        this.props.actions.modifyPublishState(this.props.user.header, newState).then(
            res => {
                this.setState({
                    updated: true
                })
            }
        ).catch(err => {
            toastr.error(err.message)
        })
    }
    onUpdate(e) {
        e.preventDefault()
        this.setState({
            redirect: true,
            link: `${this.props.location.pathname}/update`
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.link} />
        }
        return (

            <div className='container-fluid single-activity my-0 py-4'>
                <div className='go-back-button my-3 ml-3'>
                    <button className='btn btn-primary' onClick={this.onGoBack}><i className="fas fa-arrow-left pr-2"/>Go Back</button>
                </div>
                {
                    this.props.loading ? <LoadingIcon /> :
                    <React.Fragment>
                        <ActivityTitleDiv
                        title={this.props.act.name}
                        text = {this.props.act.text}
                        status = {this.props.act.published ? 'Published' : this.props.act.under_review ? 'Under Review' : 'Unpublished'}
                        color = {this.props.act.published ? 'green' : 'red'}
                        onPublish = {this.onPublish}
                        onUpdate = {this.onUpdate}
                        />
                        <div className='jumbotron activity-item ml-3'>
                            <p className='display-4 text-center'>Stats</p>
                            {
                                this.props.act._id ?  <ActivityStats activity={this.props.act} /> : null
                            }

                        </div>
                        {
                            this.props.act.total_answers > 0 &&
                            <div className='jumbotron activity-answer-charts ml-3' >
                                {
                                    this.props.act.blanks.map((b,i) => (
                                            <PieChart
                                            data={this.calculateAnswerChoices(i)}
                                            key={b+i}
                                            id = {`${b+i}chart`}
                                            title = {'Blank: '+b}
                                            description = {'Choices made by users on this blank.'}
                                            klass = {'pie-chart-flex'}
                                            />
                                    ))
                                }
                            </div>
                        }

                        <div className='jumbotron activity-feedback ml-3'>
                            <FeedbackList
                                feedbacks = {this.props.feedback.slice(
                                this.state.feedbackStartIndex, this.state.feedbackStartIndex + this.state.options.limit)}
                                onPageClick = {this.onPageSelection}
                                count = {this.props.feedback.length}
                                curPage = {this.state.currentPage}
                                pageSize = {this.state.options.limit}
                            />
                        </div>
                    </React.Fragment>
                }
            </div>
        )

    }
}

ActivityPage.propTypes = {
    user: PropTypes.object.isRequired,
    act: PropTypes.object.isRequired,
    feedback: PropTypes.array,
    loading: PropTypes.bool,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object,
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
    //reverting feedbacks
    let feedback = JSON.parse(JSON.stringify(state.activity.feedback))
    feedback.reverse()

    return {
        user,
        act: state.activity,
        feedback,
        loading: state.asyncCalls > 0
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(activityActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ActivityPage)
