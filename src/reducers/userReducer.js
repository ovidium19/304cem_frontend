import initialState from './initialState'
import * as types from '../actions/actionTypes'

export default function user(state=initialState.user, action){
    switch (action.type) {
        case types.USER_LOG_IN_SUCCESS: {
            return action.user
        }
        case types.USER_SIGN_OUT: {
            return {
                username: '',
                password: ''
            }
        }
        case types.USER_SIGN_UP_SUCCESS: {

            return {
                username: action.user.username,
                password: ''
            }
        }
    }
    return state
}
