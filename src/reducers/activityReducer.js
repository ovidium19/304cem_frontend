import initialState from './initialState'
import * as types from '../actions/actionTypes'

export default function activity(state=initialState.activity, action){
    switch (action.type) {
        case types.REMOVE_ACTIVITY: {
            return initialState.activity
        }
        case types.POST_ACTIVITY_SUCCESS: {
            console.log(action.data)
            return state
        }
    }
    return state
}
