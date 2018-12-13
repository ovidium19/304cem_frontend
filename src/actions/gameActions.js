import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as actDb from '../api/activitiesApi'

export function getGameActivitiesSuccess(data) {
    return {type: types.GET_GAME_ACTIVITIES_SUCCESS, data}
}
export function postAnswerSuccess(data) {
    return {type: types.POST_ANSWER_SUCCESS, data}
}
export function postResultsSuccess(data) {
    return {type: types.POST_RESULTS_SUCCESS, data}
}

export function pushAnswer(answer) {
    return {type: types.PUSH_ANSWER, answer}
}
export function postAnswer(header,id,data) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return actDb.postAnswer(header,id,data).then(res => {
            dispatch(postAnswerSuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
export function getGameActivities(header,params) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return actDb.getGameActivities(header,params).then(res => {
            dispatch(getGameActivitiesSuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}

export function postResults(header,results) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return actDb.postResults(header,results).then(res => {
            dispatch(postResultsSuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }

}
export function stopGame() {
    return { type: types.STOP_GAME}
}
