import {Link} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import LoadingIcon from '../common/LoadingIcon'
import * as resultsActions from '../../actions/resultsActions'
import ResultStats from './ResultStats'
import PieChart from './PieChart'
import ResultList from './ResultList'
import _ from 'underscore'
import './ResultPage.less'

export class ResultPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                page: 1,
                limit: 6
            },
            avgTime: 0,
            passRate: 0,
            categoryData: [],
            categories: [],
            updated: false
        }
        this.onResultClicked = this.onResultClicked.bind(this)
    }

    componentDidMount() {
        if (this.props.results.length == 0 && this.state.updated == false) {

            this.props.actions.getResults(this.props.user.header).then(
                res => {

                    this.setState({
                        updated: true
                    })
                }).catch(err => {
                })
        }
    }
    componentWillUnmount() {
        this.props.actions.removeResults()
    }
    onNavigateToCourse(event) {
        event.preventDefault()
        let id = event.target.attributes.courseid.nodeValue
        this.props.actions.setActiveCourse(id)
        this.props.history.push(`/course/${id}`)
    }
    calculatePassRate(data) {
        console.log(data)
        return Math.floor(data.reduce((p,c,i) => c.passed == 1 ? p + 1 : p ,0) / data.length) * 100
    }
    calculateAvgTime(data) {
        return data.reduce((p,c,i) => Math.floor(p + c.total_time / data.length), 0)
    }
    calculateCategoryPercentages(data) {
        let obj = _.countBy(data,(d) => d.category)
        console.log(obj)
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
    onResultClicked(id) {
        console.log(id)
    }
    render() {
        return (
            <div className='container-fluid results my-0 py-4'>
            {this.props.loading ?
                <LoadingIcon /> :
                this.props.results.length > 0 ?
                    <React.Fragment>
                            <ResultStats
                            passRate = {this.calculatePassRate(this.props.results)}
                            avgTime = {this.calculateAvgTime(this.props.results)} />

                            <PieChart
                            data={this.calculateCategoryPercentages(this.props.results)}
                            id={'categorychart'}
                            title={'Category Chart'}
                            description={'Chart below shows the ratio of categories you chose to play.'}/>
                            <ResultList results = {this.props.results} onClick = {this.onResultClicked} />

                    </React.Fragment>

                    :
                    <div>No data</div>
            }
            </div>
        )
    }
}

ResultPage.propTypes = {
    user: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
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
        results: state.results,
        loading: state.asyncCalls > 0
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(resultsActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ResultPage)
