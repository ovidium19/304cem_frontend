import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as actDb from '../api/activitiesApi'

export function getGameActivitiesSuccess(data) {
    return {type: types.GET_GAME_ACTIVITIES_SUCCESS, data}
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
export function stopGame() {
    return { type: types.STOP_GAME}
}
