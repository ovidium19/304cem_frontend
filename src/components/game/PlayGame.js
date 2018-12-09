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
            score: 0,
            redirect: false,
            link: '',
            updated: false,
            categoryOptions: categories

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.renderState = this.renderState.bind(this)
        this.getOptions = this.getOptions.bind(this)
        this.onDragAnswerToBlank = this.onDragAnswerToBlank.bind(this)
    }

    componentDidMount() {

    }
    componentWillUnmount() {
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
                this.setState({
                    gameState:'Show Question',
                    currentQuestion: this.state.currentQuestion + 1,
                    showValues: Array.from(this.props.activities[this.state.currentQuestion+1].blanks, a => '')
                })
            }).catch(err => {
                toastr.error(err.message)
            })
    }
    getOptions() {
        let options = _.flatten(this.props.activities[this.state.currentQuestion].options)
        return _.shuffle(options)

    }
    onDragAnswerToBlank(value,index) {
        console.log(value, index)
        let state =  Array.from(this.state.showValues)
        state[index] = value
        this.setState({
            showValues: state
        })
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
                        <ActivityText
                        text = {this.props.activities[this.state.currentQuestion].text}
                        blanks = {this.props.activities[this.state.currentQuestion].blanks}
                        klass={'display-4'}
                        showValues = { this.state.showValues}
                        onDrag = {this.onDragAnswerToBlank}
                        />
                        <ActivityOptions
                        options = {this.getOptions()}
                        />
                    </div>
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
