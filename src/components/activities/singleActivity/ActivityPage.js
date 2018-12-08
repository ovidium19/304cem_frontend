import {Link, Redirect} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import LoadingIcon from '../../common/LoadingIcon'
import ActivityTitleDiv from './ActivityTitleDiv'
import ActivityStats from '../ActivityStats'
import * as activityActions from '../../../actions/activityActions'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

import _ from 'underscore'
import PieChart from '../../results/PieChart'


export class ActivityPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                page: 1,
                limit: 5
            },
            redirect: false,
            link: '',
            sortBy: 'timestamp',
            currentPage: 1,
            updated: false,
        }
        this.onPageSelection = this.onPageSelection.bind(this)
        this.onGoBack = this.onGoBack.bind(this)
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
        this.props.actions.removeActivity()
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
         console.log(result)
         return result
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
    onGoBack(e){
        e.preventDefault()
        this.setState({
            redirect: true,
            link: `/app/user/${this.props.user.username}/activities`
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.link} />
        }
        return (

            <div className='container-fluid single-activity my-0 py-4'>
                <div className='go-back-button my-3 ml-3'>
                    <button className='btn btn-primary' onClick={this.onGoBack}><i className="fas fa-arrow-left pr-2"></i>Go Back</button>
                </div>
                <ActivityTitleDiv
                title={this.props.act.name}
                text = {this.props.act.text}
                status = {this.props.act.published ? 'Published' : this.props.act.under_review ? 'Under Review' : 'Unpublished'}
                color = {this.props.act.published ? 'green' : 'red'}
                />
                <div className='jumbotron activity-item ml-3'>
                    <p className='display-4 text-center'>Stats</p>
                    {
                        this.props.act._id ?  <ActivityStats activity={this.props.act} /> : null
                    }

                </div>
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



            </div>
        )

    }
}

ActivityPage.propTypes = {
    user: PropTypes.object.isRequired,
    act: PropTypes.object.isRequired,
    loading: PropTypes.bool,
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
        act: state.activity,
        loading: state.asyncCalls > 0
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(activityActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ActivityPage)
