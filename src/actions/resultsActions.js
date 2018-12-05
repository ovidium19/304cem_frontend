import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as resDb from '../api/resultsApi'

export function getResultsSuccess(data) {
    return {type: types.GET_RESULTS_SUCCESS, data}
}
export function removeResults() {
    return {type: types.REMOVE_RESULTS}
}
export function getResults(header){
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return resDb.getResults(header).then(res => {
            dispatch(getResultsSuccess(Object.assign({},res)))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
