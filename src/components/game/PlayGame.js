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

/**
 * @class - This class handles all the logic and state of playing a game of Fill in Blanks.
 */
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

    componentWillUnmount() {
        this.setState({
            gameState: 'finished'
        })
        //revert the redux state of the game to its initial values
        this.props.actions.stopGame()
    }
    onChange(event) {
        //handle form inputs when setting up a game.
        const field = event.target.name
        const params = Object.assign({},this.state.params)
        switch(field) {
            case 'allow_anon': {
                //this comes back as a string but needs to be converted to boolean
                params[field] = event.target.value == 'true' ? true : false
                break
            }
            default: {
                params[field] = event.target.value
            }
        }
        this.setState({params})

    }
    /**
     * There is a small form when setting up a game, where user can choose a category and anonynmous status
     * @param {Event} e - just to prevent default behaviour of submitting a form
     */
    onSubmit(e) {

        e.preventDefault()
        //Show loading icon while fetching questions
        this.setState({
            gameState: 'Loading',
            message: 'Loading Questions'
        })
        let params = {}
        //Sanitize params to match API schema
        if (this.state.params.category !== 'Random') params.category = this.state.params.category
        if (this.state.params.allow_anon) params.allow_anon = this.state.params.allow_anon

        //call redux-thunk to get game activities
        this.props.actions.getGameActivities(this.props.user.header,params)
            .then(res => {
                console.log(res)
                //Move to next question when they are ready
                this.setStateToNextQuestion()
            }).catch(err => {
                toastr.error(err.message)
            })
    }
    /**
     * Get all available options for all available blanks in the current activity and shuffle their order.
     * @param {number} index - The current activity index
     */
    getOptions(index) {
        let options = _.flatten(this.props.activities[index].options)
        return _.shuffle(options)

    }
    /**
     * The game timer calls this every second.
     * If time reaches 30 seconds, we advance automatically to next question.
     */
    timerCallback() {

        this.setState({
            currentTime: this.state.currentTime + 1
        }, () => {
            if (this.state.currentTime == this.state.maxTime) {
                this.advanceState()
            }
        })
    }
    /**
     *
     * @param {Object} feedback - The feedback object created by the user - contains text and rating
     * @param {number} index - This is the index of the activity which the user provided feedback for
     */
    onFeedbackSend(feedback,index) {
        /**
         * While processing the request, set the status of the feedback section to loading
         * This renders a loading icon in place of the feedback form.
         */
        let ff = Array.from(this.state.feedbackStatus)
        ff[index] = "Loading"
        this.setState({
            feedbackStatus: ff
        })
        //if the question allows anonymous feedback, set username to empty string.
        let id = this.props.activities[index]._id
        let username = this.props.activities[index].allow_anon ? '' : this.props.user.username
        let refactoredFeedback = Object.assign({},feedback,{username})

        //redux-thunk to post feedback to activity.
        this.props.actions.sendFeedback(this.props.user.header ,id,refactoredFeedback)
            .then(res => {
                /**
                 * When done, set feedback status to 'Sent', whch renders a green message
                 * to let the user know the feedback was submitted
                 */
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
    /**
     * After each activity, we save the user's answer to that activity's collection entry.
     */
    saveAnswer() {
        //Set up the correctEach array. it should have objects that have a correct field and the answer given
        let question = this.props.activities[this.state.currentQuestion]
        let correctEach = []
        question.blanks.map((b,i) => {
            correctEach.push({
                correct: b == this.state.showValues[i] ? 1 : 0,
                answer: this.state.showValues[i]
            })
        })
        //find out if the user answered correctly
        let correctAll = correctEach.reduce((p,c) => p && c.correct, 1)
        let answer = {
            username: question.allow_anon ? "" : this.props.user.username,
            allow_anon: question.allow_anon,
            time: this.state.currentTime,
            correctAll,
            correctEach,
            finished: true
        }
        //this pushes the answer to our internal redux state, so that later on we can show
        //all answers on the result screen.
        this.props.actions.pushAnswer(answer)

        //redux-thunk to post answer to activity
        return this.props.actions.postAnswer(this.props.user.header,question._id,answer)
    }

    /**
     * At the end of a question, we call this function to advance state to next question
     */
    goToNextQuestion() {
        let gameState = 'Show Question'

        //If we ran out of questions, show Results
        if (this.state.currentQuestion == this.props.activities.length - 1) {
            gameState = 'Results'
        }
        //this timeout is here just to show the loading animation a bit more
        setTimeout(() => {
            //post results and show result screen
            if (gameState == 'Results') {
                this.postResultsAndShow()
            }
            else{
                //advance to next question if we still have questions available
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
    /**
     * This function creates a results object specific to the DB schema
     * Sends the results with a redux-thunk
     * then sets the state to show the Results
     */
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

    /**
     * This function handles two cases.
     * When game just started, this function starts recording the time and sets the feedbackStatus array which is
     * needed for the Results screen
     * When an answer is given, this function calls this.goToNextQuestion after saving the answer.
     */
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
    /**
     *
     * @param {string} value - Value of element dragged
     * @param {number} index - Index of blank area dragged over
     * @param {string} cur - Current blank value
     */
    onDragAnswerToBlank(value,index,cur) {
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
    /**
     * Based on this.state.gameState, we render one of the required pages.
     */
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
