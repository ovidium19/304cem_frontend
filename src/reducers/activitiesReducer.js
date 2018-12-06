import initialState from './initialState'
import * as types from '../actions/actionTypes'

export default function results(state=initialState.userActivities, action){
    switch (action.type) {
        case types.GET_ACTIVITIES_SUCCESS: {
            return action.data
        }
        case types.REMOVE_ACTIVITIES: {
            return {
                count: 0,
                data: []
            }
        }
    }
    return state
}
