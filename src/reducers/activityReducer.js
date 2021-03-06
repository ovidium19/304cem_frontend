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
        case types.GET_ACTIVITY_SUCCESS: {
            return action.data
        }
        case types.MODIFY_ACTIVITY_PUBLISH_STATE_SUCCESS:
        case types.UPDATE_ACTIVITY_SUCCESS:  {
            console.log('Modified activity')
            return action.data
        }
        case types.PUBLISH_ACTIVITY_SUCCESS: {
            console.log('Published')
            return state
        }
        case types.DECLINE_ACTIVITY_SUCCESS: {
            console.log('Declined')
            return state
        }
    }
    return state
}
