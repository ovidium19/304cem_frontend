import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as userDb from '../api/authApi'

export function logInUserSuccess(user){
    return {type: types.USER_LOG_IN_SUCCESS, user}
}
export function signUpUserSuccess(user) {
    return {type: types.USER_SIGN_UP_SUCCESS, user}
}
export function signOutUser(){
    return {type: types.USER_SIGN_OUT}
}

export function logInUser(credentials){
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return userDb.login(credentials).then(res => {
            dispatch(logInUserSuccess(Object.assign({},res)))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
export function signUpUser(credentials){
    return (dispatch,getState) => {
        dispatch(beginAsyncOp())
        return userDb.signup(credentials).then(res => {
            dispatch(signUpUserSuccess(Object.assign({},res)))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
