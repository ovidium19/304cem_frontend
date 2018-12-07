import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as actDb from '../api/activitiesApi'

export function getActivitiesSuccess(data) {
    return {type: types.GET_ACTIVITIES_SUCCESS, data}
}
export function removeActivities() {
    return {type: types.REMOVE_ACTIVITIES}
}
export function getActivities(header,username,params){
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return actDb.getActivities(header,username,params).then(res => {
            dispatch(getActivitiesSuccess(Object.assign({},res)))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
