import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as actDb from '../api/activitiesApi'

export function getActivitiesSuccess(data) {
    return {type: types.GET_ACTIVITIES_SUCCESS, data}
}
export function postActivitySuccess(data) {
    return {type: types.POST_ACTIVITY_SUCCESS, data}
}
export function getActivityByIdSuccess(data) {
    return {type: types.GET_ACTIVITY_SUCCESS, data}
}
export function modifyPublishStateSuccess(data) {
    return {type: types.MODIFY_ACTIVITY_PUBLISH_STATE_SUCCESS, data}
}
export function updateActivitySuccess(data) {
    return {type: types.UPDATE_ACTIVITY_SUCCESS, data}
}
export function removeActivities() {
    return {type: types.REMOVE_ACTIVITIES}
}
export function removeActivity() {
    return {type: types.REMOVE_ACTIVITY}
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

export function postActivity(header,activity) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return actDb.postActivity(header,activity).then(res => {
            dispatch(postActivitySuccess(Object.assign({},res)))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
export function getActivityById(header,id) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return actDb.getActivityById(header,id).then(res => {
            dispatch(getActivityByIdSuccess(Object.assign({},res)))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
export function modifyPublishState(header,act) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return actDb.modifyPublishState(header,act).then(res => {
            dispatch(modifyPublishStateSuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
export function updateActivity(header,act) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return actDb.updateActivity(header,act).then(res => {
            dispatch(updateActivitySuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}

