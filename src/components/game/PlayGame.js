import {Link, Redirect} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {DragDropContextProvider} from 'react-dnd'
import HTML5BackEnd from 'react-dnd-html5-backend'
import * as gameActions from '../../actions/gameActions'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import _ from 'underscore'
import toastr from 'toastr'
import categories from '../common/categories'
import ActivityText from '../common/ActivityText'
import SetupScreen from './SetupScreen'
import './Game.less'
import LoadingSpinner from '../common/LoadingSpinner'
import ActivityOptions from './ActivityOptions'
import Timer from './Timer'
import ResultScreen from './ResultScreen'

export class PlayGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            params: {
                allow_anon: false,
                category: 'Random'
            },
            gameState: 'Setting up',
            showValues: [],
            currentQuestion: -1,
            currentOptions: [],
            score: 0,
            redirect: false,
            link: '',
            updated: false,
            categoryOptions: categories,
            time: [],
            maxTime: 30,
            currentTime: 0,
            start_time: null,
            feedbackStatus: []

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.renderState = this.renderState.bind(this)
        this.getOptions = this.getOptions.bind(this)
        this.onDragAnswerToBlank = this.onDragAnswerToBlank.bind(this)
        this.advanceState = this.advanceState.bind(this)
        this.timerCallback = this.timerCallback.bind(this)
        this.onFeedbackSend = this.onFeedbackSend.bind(this)
    }

    componentDidMount() {

    }
    componentWillUnmount() {
        this.setState({
            gameState: 'finished'
        })
        this.props.actions.stopGame()
    }
    onChange(event) {
        const field = event.target.name
        const params = Object.assign({},this.state.params)
        switch(field) {
            case 'allow_anon': {
                params[field] = event.target.value == 'true' ? true : false
                break
            }
            default: {
                params[field] = event.target.value
            }
        }
        this.setState({params})

    }
    onSubmit(e) {
        e.preventDefault()
        this.setState({
            gameState: 'Loading',
            message: 'Loading Questions'
        })
        let params = {}
        if (this.state.params.category !== 'Random') params.category = this.state.params.category
        if (this.state.params.allow_anon) params.allow_anon = this.state.params.allow_anon
        this.props.actions.getGameActivities(this.props.user.header,params)
            .then(res => {
                console.log(res)
                this.setStateToNextQuestion()
            }).catch(err => {
                toastr.error(err.message)
            })
    }
    getOptions(index) {
        let options = _.flatten(this.props.activities[index].options)
        return _.shuffle(options)

    }
    timerCallback() {

        this.setState({
            currentTime: this.state.currentTime + 1
        }, () => {
            if (this.state.currentTime == this.state.maxTime) {
                this.advanceState()
            }
        })
    }
    onFeedbackSend(feedback,index) {
        console.log(feedback)
        console.log(index)
        console.log(this.state.feedbackStatus[index])
        let ff = Array.from(this.state.feedbackStatus)
        ff[index] = "Loading"
        this.setState({
            feedbackStatus: ff
        })
        let id = this.props.activities[index]._id
        let username = this.props.activities[index].allow_anon ? '' : this.props.user.username
        let refactoredFeedback = Object.assign({},feedback,{username})
        this.props.actions.sendFeedback(this.props.user.header ,id,refactoredFeedback)
            .then(res => {
                let ff = Array.from(this.state.feedbackStatus)
                ff[index] = "Sent"
                this.setState({
                    feedbackStatus: ff
                })
            })
            .catch(err => {
                console.log(err)
                throw(err)
            })
    }
    saveAnswer() {
        let question = this.props.activities[this.state.currentQuestion]
        let correctEach = []
        question.blanks.map((b,i) => {
            correctEach.push({
                correct: b == this.state.showValues[i] ? 1 : 0,
                answer: this.state.showValues[i]
            })
        })
        let correctAll = correctEach.reduce((p,c) => p && c.correct, 1)
        let answer = {
            username: question.allow_anon ? "" : this.props.user.username,
            allow_anon: question.allow_anon,
            time: this.state.currentTime,
            correctAll,
            correctEach,
            finished: true
        }
        this.props.actions.pushAnswer(answer)
        return this.props.actions.postAnswer(this.props.user.header,question._id,answer)
    }
    goToNextQuestion() {
        let gameState = 'Show Question'
        if (this.state.currentQuestion == this.props.activities.length - 1) {
            gameState = 'Results'
        }
        setTimeout(() => {
            if (gameState == 'Results') {
                this.postResultsAndShow()
            }
            else{
                this.setState({
                    gameState,
                    currentQuestion: this.state.currentQuestion + 1,
                    showValues: Array.from(this.props.activities[this.state.currentQuestion+1].blanks, a => ''),
                    currentOptions: this.getOptions(this.state.currentQuestion+1),
                    time: this.state.currentTime > 0 ? [...this.state.time, this.state.currentTime] : [...this.state.time],
                    currentTime: 0
                })

            }
        }, 500)


    }
    postResultsAndShow() {
        //format results to include question id
        let results = {}
        results.answers = JSON.parse(JSON.stringify(this.props.answers))
        results.username = this.props.user.username
        results.category = this.state.params.category
        results.timestamp = this.state.start_time
        results.answers = results.answers.map((r,i) => {
            let {username, allow_anon, finished, ...res} = r
            res.question_id = this.props.activities[i]._id
            return res
        })
        results.passed = this.state.score >= 60 ? 1 : 0
        console.log(results)
        this.props.actions.postResults(this.props.user.header,results)
            .then(res => {
                console.log(res)
                this.setState({
                    gameState: 'Results'
                })
            })

    }
    setStateToNextQuestion() {
        console.log('Setting state to next question')
        this.setState({
            gameState: 'Loading'
        })
        if (this.state.currentQuestion >= 0)
            this.saveAnswer().then(res => {
                this.goToNextQuestion()
            })
        else {
            this.setState({
                start_time: new Date(Date.now()),
                feedbackStatus: Array.from(this.props.activities, a => a.allow_feedback ? 'Available' : 'Not Available')
            }, () => {
                this.goToNextQuestion()
            })
        }

    }
    onDragAnswerToBlank(value,index,cur) {
        console.log(value, index)
        let state =  Array.from(this.state.showValues)
        state[index] = value
        let options = Array.from(this.state.currentOptions)
        if (cur) {
            let ind = options.findIndex(c => c == value)
            options.splice(ind,1,cur)
        }
        this.setState({
            showValues: state,
            currentOptions: options
        })
    }
    calculateScore() {
        let choices = this.state.showValues
        let passed = this.props.activities[this.state.currentQuestion].blanks.reduce((p,c,i) => p && c == choices[i], true)
        console.log(`User has passed : ${passed}`)
        this.setState({
            score: passed ? this.state.score + 20 : this.state.score
        })
    }
    advanceState() {
        this.calculateScore()
        this.setStateToNextQuestion()

    }
    renderState() {
        switch ( this.state.gameState) {
            case 'Setting up': {
                return (
                    <SetupScreen
                    onChange = {this.onChange}
                    onSubmit = {this.onSubmit}
                    params = {this.state.params}
                    categoryOptions = {this.state.categoryOptions}
                    />
                )
            }
            case 'Loading': {
                return (
                    <LoadingSpinner
                    message = {this.state.message}
                    />
                )
            }
            case 'Show Question': {
                return (
                    <div
                    className='d-flex justify-content-space-between align-items-center flex-nowrap flex-column play-activity m-0 p-0'
                    style={this.props.activities[this.state.currentQuestion].styles}>
                    <div className='align-self-stretch mt-2'>
                        <button className='btn btn-success float-right mx-2' onClick={this.advanceState}>Advance</button>
                        <Timer displayTime = {this.state.maxTime - this.state.currentTime} callback = {this.timerCallback} />

                    </div>

                        <ActivityText
                        text = {this.props.activities[this.state.currentQuestion].text}
                        blanks = {this.props.activities[this.state.currentQuestion].blanks}
                        klass={'display-4'}
                        showValues = { this.state.showValues}
                        onDrag = {this.onDragAnswerToBlank}
                        />
                        <ActivityOptions
                        options = {this.state.currentOptions}
                        />
                    </div>
                )
            }
            case 'Results': {
                return (
                    <ResultScreen
                    answers = {this.props.answers}
                    activities = {this.props.activities}
                    username = {this.props.user.username}
                    score = {this.state.score}
                    onFeedbackSend = {this.onFeedbackSend}
                    feedbackStatus = {this.state.feedbackStatus}
                    />
                )
            }
            default: {
                return null
            }
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.link} />
        }
        return (
            <DragDropContextProvider backend={HTML5BackEnd}>
                 <div className='game container-fluid d-flex flex-column m-0 p-0'>
                    {
                    this.renderState()
                    }
                </div>
            </DragDropContextProvider>

        )

    }
}
PlayGame.propTypes = {
    user: PropTypes.object.isRequired,
    activities: PropTypes.array.isRequired,
    answers: PropTypes.array.isRequired,
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
        activities: state.game.activities,
        answers: state.game.answers,
        loading: state.asyncCalls > 0
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(gameActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayGame)
